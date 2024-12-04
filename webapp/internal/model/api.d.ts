interface ReqArgs extends RequestInit {
	query?: { [key: string]: any }
}

interface RespData<T> {
	status_code: number
	status_message: string
	success: boolean
	data: T
	resp_time: TimestampSec
	latency: number
}