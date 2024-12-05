package command

import (
	"athenabase/internal"
	"athenabase/internal/model"
	"athenabase/internal/service"
	"athenabase/logger"
	"context"

	"github.com/spf13/cobra"
)

var (
	email    string
	password string

	createsuperuser = &cobra.Command{
		Use:   "createsuperuser",
		Short: "Create super user",
		Long:  "Create a superuser with an email and an optional password.",
		Run: func(cmd *cobra.Command, args []string) {
			if email == "" {
				logger.Error("Error: email is required")
				return
			}

			if password == "" {
				password = internal.RandomString(16)
			}

			cipher := service.Auth.MakePassWord(password)

			authUser := &model.AuthUser{
				Name:        email,
				Email:       email,
				PassWord:    cipher,
				IsSuperUser: true,
			}
			ctx := context.Background()
			_, err := model.MasterDB().NewInsert().Model(authUser).Exec(ctx)
			if err != nil {
				logger.Error(err.Error())
				return
			}
			logger.Infof("email: %s\npassword: %s\n", email, password)
		},
	}
)

func init() {
	createsuperuser.Flags().StringVarP(&email, "email", "e", "", "Email address of the superuser (required)")
	createsuperuser.Flags().StringVarP(&password, "password", "p", "", "Password for the superuser (optional)")
	createsuperuser.MarkFlagRequired("email")
}
