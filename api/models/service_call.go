package models

import (
	"encoding/json"
	"time"

	"github.com/gobuffalo/pop/v6"
	"github.com/gobuffalo/validate/v3"
	"github.com/gobuffalo/validate/v3/validators"
	"github.com/gofrs/uuid"
)

// ServiceCall is used by pop to map your service_calls database table to your go code.
type ServiceCall struct {
	ID            uuid.UUID `json:"id" db:"id"`
	Name          string    `json:"name" db:"name"`
	Date          time.Time `json:"date" db:"date"`
	StartTime     time.Time `json:"start_time" db:"start_time"`
	StopTime      time.Time `json:"stop_time" db:"stop_time"`
	Reason        string    `json:"reason" db:"reason"`
	WorkPerformed string    `json:"work_performed" db:"work_performed"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

// String is not required by pop and may be deleted
func (s ServiceCall) String() string {
	js, _ := json.Marshal(s)
	return string(js)
}

// ServiceCalls is not required by pop and may be deleted
type ServiceCalls []ServiceCall

// String is not required by pop and may be deleted
func (s ServiceCalls) String() string {
	js, _ := json.Marshal(s)
	return string(js)
}

// Validate gets run every time you call a "pop.Validate*" (pop.ValidateAndSave, pop.ValidateAndCreate, pop.ValidateAndUpdate) method.
// This method is not required and may be deleted.
func (s *ServiceCall) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: s.Name, Name: "Name"},
		&validators.TimeIsPresent{Field: s.Date, Name: "Date"},
		&validators.TimeIsPresent{Field: s.StartTime, Name: "StartTime"},
		&validators.TimeIsPresent{Field: s.StopTime, Name: "StopTime"},
		&validators.StringIsPresent{Field: s.Reason, Name: "Reason"},
		&validators.StringIsPresent{Field: s.WorkPerformed, Name: "WorkPerformed"},
	), nil
}

// ValidateCreate gets run every time you call "pop.ValidateAndCreate" method.
// This method is not required and may be deleted.
func (s *ServiceCall) ValidateCreate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run every time you call "pop.ValidateAndUpdate" method.
// This method is not required and may be deleted.
func (s *ServiceCall) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}
