package command

import (
	"athenabase/config"
	"athenabase/logger"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var (
	root = &cobra.Command{
		Use:   "athenabase",
		Short: "AthenaBase: A BI System",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("AthenaBase 💻 🔪🐛")

			logger.Info(config.GetWebServerConfig())
		},
	}
)

func Execute() {
	if err := root.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
