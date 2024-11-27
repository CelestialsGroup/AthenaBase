package command

import (
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
		},
	}
)

func init() {
	root.AddCommand(runserver)
}

func Execute() {
	if err := root.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
