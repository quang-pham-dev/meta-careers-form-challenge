import { BASE_URL } from '@/constants'

import { HttpClient } from '@/lib/services'

export const HttpClientInstance = new HttpClient(BASE_URL)
