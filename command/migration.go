package command

import (
	"athenabase/internal/migrate"

	"github.com/spf13/cobra"
)

var (
	migration = &cobra.Command{
		Use:   "migration",
		Short: "migration system",
		Long:  "migration system",
		Run: func(cmd *cobra.Command, args []string) {
			migrate.Migrate()
		},
	}
)
