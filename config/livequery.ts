
// Cấu hình thư viện livequery dùng để đồng bộ dữ liệu realtime giữa client với server
import { RestTransporter } from '@livequery/rest'
import { auth } from './firebase'
// import { auth } from './firebase'


export const LivequeryHttpTransporter = new RestTransporter({
    base_url: () => process.env.NEXT_PUBLIC_API!,
    ... typeof window == 'undefined' ? {} : {
        websocket_url: typeof window == 'undefined' ? undefined : (() => process.env.NEXT_PUBLIC_WS! as any)
    } as any,
    headers: async () => {
        const user = auth.currentUser
        return {
            ...user ? { authorization: await user.getIdToken() } : {}
        }
    },
})