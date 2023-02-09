package models

import (
	"encoding/json"
	"time"

	"github.com/gobuffalo/pop/v6"
	"github.com/gobuffalo/validate/v3"
	"github.com/gobuffalo/validate/v3/validators"
	"github.com/gofrs/uuid"
)

// Address is used by pop to map your addresses database table to your go code.
type Address struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Type      string    `json:"type" db:"type"`
	Address1  string    `json:"address1" db:"address1"`
	Address2  string    `json:"address2" db:"address2"`
	City      string    `json:"city" db:"city"`
	State     string    `json:"state" db:"state"`
	Zip       string    `json:"zip" db:"zip"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// String is not required by pop and may be deleted
func (a Address) String() string {
	ja, _ := json.Marshal(a)
	return string(ja)
}

// Addresses is not required by pop and may be deleted
type Addresses []Address

// String is not required by pop and may be deleted
func (a Addresses) String() string {
	ja, _ := json.Marshal(a)
	return string(ja)
}

// Validate gets run every time you call a "pop.Validate*" (pop.ValidateAndSave, pop.ValidateAndCreate, pop.ValidateAndUpdate) method.
// This method is not required and may be deleted.
func (a *Address) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: a.Name, Name: "Name"},
		&validators.StringIsPresent{Field: a.Type, Name: "Type"},
		&validators.StringIsPresent{Field: a.Address1, Name: "Address1"},
		&validators.StringIsPresent{Field: a.Address2, Name: "Address2"},
		&validators.StringIsPresent{Field: a.City, Name: "City"},
		&validators.StringIsPresent{Field: a.State, Name: "State"},
		&validators.StringIsPresent{Field: a.Zip, Name: "Zip"},
	), nil
}

// ValidateCreate gets run every time you call "pop.ValidateAndCreate" method.
// This method is not required and may be deleted.
func (a *Address) ValidateCreate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run every time you call "pop.ValidateAndUpdate" method.
// This method is not required and may be deleted.
func (a *Address) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}
