package command

import (
	"athenabase/internal/migrate"

	"github.com/spf13/cobra"
)

func init() {
	root.AddCommand(upgrade)
}

var (
	upgrade = &cobra.Command{
		Use:   "upgrade",
		Short: "upgrade system",
		Long:  "upgrade system",
		Run: func(cmd *cobra.Command, args []string) {
			migrate.Migrate()
		},
	}
)
