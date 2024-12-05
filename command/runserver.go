package command

import (
	"athenabase/internal/migrate"
	"athenabase/server"
	"context"

	"github.com/spf13/cobra"
)

var (
	runserver = &cobra.Command{
		Use:   "runserver",
		Short: "run server",
		Long:  "run server: api web",
		Run: func(cmd *cobra.Command, args []string) {
			ctx := context.Background()
			migrate.Migrate()
			server.Start(ctx)
		},
	}
)
