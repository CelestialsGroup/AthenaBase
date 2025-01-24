package helper_test

import (
	"athenabase/helper"
	"strings"
	"testing"
)

func TestContains(t *testing.T) {
	tests := []struct {
		name  string
		slice []string
		elem  string
		want  bool
	}{
		{"Element exists", []string{"a", "b", "c"}, "b", true},
		{"Element does not exist", []string{"a", "b", "c"}, "d", false},
		{"Empty slice", []string{}, "a", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := helper.Contains(tt.slice, tt.elem)
			if got != tt.want {
				t.Errorf("Contains() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestRandomString(t *testing.T) {
	// Test case 1: Check if the generated string is of the correct length
	t.Run("Correct length", func(t *testing.T) {
		str := helper.RandomString(10)
		if len(str) != 10 {
			t.Errorf("Expected string length 10, got %d", len(str))
		}
	})

	// Test case 2: Check if the generated string contains only allowed characters (letters + digits)
	t.Run("Contains valid characters", func(t *testing.T) {
		str := helper.RandomString(20)
		for _, char := range str {
			if !strings.Contains(helper.AsciiLetters+helper.Digits, string(char)) {
				t.Errorf("Generated string contains invalid character: %c", char)
			}
		}
	})

	// Test case 3: Generate a few random strings to ensure they're not the same (although randomness is not guaranteed)
	t.Run("Randomness", func(t *testing.T) {
		str1 := helper.RandomString(15)
		str2 := helper.RandomString(15)
		if str1 == str2 {
			t.Error("Generated strings are the same, expected randomness")
		}
	})
}
