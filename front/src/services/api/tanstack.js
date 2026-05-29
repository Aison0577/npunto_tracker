// tanstack hooks
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AUTH } from './auth'
import toast from 'react-hot-toast'
import { API } from '.'


export const useLogin=()=>
{
    return useMutation({
        mutationKey:['auth-login'],
        mutationFn:async(payload)=>{
            // init cookie connection between react and laravel
            await AUTH.useGetCsrfCookie()
            // make the login call
            const res = await AUTH.useLogin(payload)
            if(res.success)
            {
                return res.data
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        }
    })
}

export const useCreateNewActivity=()=>
    {
        return useMutation({
        mutationKey:['new-activity'],
        mutationFn:async(payload)=>{
            const res = await API.newActivity(payload)
            if(res.success)
                {
                    return res.message
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        }
    })
}

export const useDailyView=(date)=>
    {
        return useQuery({
        queryKey:['daily-activity', date],
        queryFn:async()=>{
            const res = await API.dailyActivity(date)
            if(res.success)
            {
                return res.activities
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        }
    })
}

export const useActivityDetails=(activityId)=>
    {
        return useQuery({
        queryKey:['activity', activityId],
        queryFn:async()=>{
            const res = await API.activityDetails(activityId)
            if(res.success)
            {
                return res.activity
            }
        },
        enabled:!!activityId,
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        }
    })
}

export const useUpdateActivity=(id)=>
    {
        const queryClient = useQueryClient()
        return useMutation({
        mutationKey:['activity', id ],
        mutationFn:async(payload)=>{
            const res = await API.updateActivityDetails(payload)
            if(res.success)
            {
                return res.message
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        },onSuccess:()=>{
            queryClient.invalidateQueries(['activity', id])
        }
    })
}

export const useUpdateActivityState=(id)=>
    {
        const queryClient = useQueryClient()
        return useMutation({
        mutationKey:['activity', id ],
        mutationFn:async(payload)=>{
            const res = await API.updateActivityState(payload)
            if(res.success)
            {
                return res.message
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        },onSuccess:()=>{
            queryClient.invalidateQueries(['activity', id, 'activities'])
        }
    })
}

export const useTeam=()=>
    {
        return useQuery({
        queryKey:['team'],
        queryFn:async()=>{
            const res = await API.team()
            if(res.success)
            {
                return res.data
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        }
    })
}


export const useAddTeamMember=()=>
    {
        const queryClient = useQueryClient()
        return useMutation({
        mutationKey:['newMember' ],
        mutationFn:async(payload)=>{
            const res = await API.newMember(payload)
            if(res.success)
            {
                return res.message
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        },onSuccess:()=>{
            queryClient.invalidateQueries(['team'])
        }
    })
}


export const useRemoveTeamMember=()=>
{
        const queryClient = useQueryClient()
        return useMutation({
        mutationKey:['delete_user' ],
        mutationFn:async(userId)=>{
            const res = await API.deleteMember(userId)
            if(res.success)
            {
                return res.message
            }
        },
        onError:(error)=>
        {
            toast.error(error.message ?? "Something went wrong");
        },onSuccess:()=>{
            queryClient.invalidateQueries(['team'])
        }
    })
}


export const useReport = (filters, enabled = false) =>
    useQuery({
      queryKey: ["report", filters],
      queryFn: async () => {
        const res = await API.fetchReport(filters);
        if (res.success) return res;
      },
      enabled,
      onError: (error) => toast.error(error.message ?? "Something went wrong"),
});