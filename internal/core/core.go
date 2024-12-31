package core

import "sync"

type core struct{}

var coreInstance *core
var coreOnce sync.Once

func GetCoreInstance() *core {
	coreOnce.Do(func() {
		coreInstance = &core{}
	})
	return coreInstance
}
