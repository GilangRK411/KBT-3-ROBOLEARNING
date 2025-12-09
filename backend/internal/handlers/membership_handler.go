package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"robolearning/internal/middleware"
	"robolearning/internal/models"
	"robolearning/internal/services"
)

type MembershipHandler struct {
	membershipService *services.MembershipService
}

func NewMembershipHandler(membershipService *services.MembershipService) *MembershipHandler {
	return &MembershipHandler{membershipService: membershipService}
}

type subscribeRequest struct {
	PlanCode   string `json:"plan_code"` // optional; prefer plan number mapping
	PlanNumber int    `json:"plan"`      // optional; 1=1 bulan, 2=3 bulan, 3=6 bulan
	UserID     int64  `json:"user_id"`   // optional, ignored (user inferred from token)
}

func (h *MembershipHandler) Subscribe(c *gin.Context) {
	raw, ok := c.Get(middleware.ContextUserIDKey)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID, ok := raw.(int64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req subscribeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	planCode, err := h.membershipService.ResolvePlanCode(req.PlanCode, req.PlanNumber)
	if err != nil {
		switch err {
		case services.ErrPlanNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "plan not found"})
		default:
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}

	membership, err := h.membershipService.Subscribe(userID, planCode)
	if err != nil {
		switch err {
		case services.ErrPlanNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "plan not found"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to start membership"})
		}
		return
	}

	c.JSON(http.StatusCreated, gin.H{"membership": BuildMembershipResponse(membership)})
}

func (h *MembershipHandler) MyMembership(c *gin.Context) {
	raw, ok := c.Get(middleware.ContextUserIDKey)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID, ok := raw.(int64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	membership, err := h.membershipService.GetActiveMembership(userID)
	if err != nil {
		if err == services.ErrNoActiveMembership {
			c.JSON(http.StatusOK, gin.H{"membership": nil})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load membership"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"membership": BuildMembershipResponse(membership)})
}

func (h *MembershipHandler) GetPlan(c *gin.Context) {
	rawPlan := c.Param("plan")
	plan, err := h.membershipService.GetPlanByInput(rawPlan)
	if err != nil {
		if err == services.ErrPlanNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "plan not found"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"plan": buildPlanResponse(*plan)})
}

func BuildMembershipResponse(m *models.UserMembership) gin.H {
	if m == nil {
		return nil
	}
	resp := gin.H{
		"id":         m.ID,
		"user_id":    m.UserID,
		"plan_id":    m.PlanID,
		"starts_at":  m.StartsAt,
		"ends_at":    m.EndsAt,
		"status":     m.Status,
		"created_at": m.CreatedAt,
	}

	if m.Plan != nil {
		resp["plan"] = buildPlanResponse(*m.Plan)
	}
	return resp
}

func buildPlanResponse(p models.MembershipPlan) gin.H {
	return gin.H{
		"id":            p.ID,
		"code":          p.Code,
		"name":          p.Name,
		"duration_days": p.DurationDays,
		"price_idr":     p.PriceIDR,
		"created_at":    p.CreatedAt,
	}
}
