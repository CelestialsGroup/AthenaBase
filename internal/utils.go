package internal

func Contains[T comparable](s []T, elem T) bool {
	for _, a := range s {
		if a == elem {
			return true
		}
	}
	return false
}
