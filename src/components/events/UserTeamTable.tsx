'use client';
import { toCapitalize } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { respondToInvitation } from '@/http/api';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
export default function UserTeamTable({ userTeamData }: { userTeamData: any }) {
  const { data: session } = useSession();
  console.log('session', session);
  const queryClient = useQueryClient();
  const [isSelectedMemberId, setIsSelectedMemberId] = useState('');
  const [action, setAction] = useState('');
  const { members } = userTeamData;
  const {
    mutate: respondToInvitationMutate,
    isPending: isRespondToInvitationMutatePending,
  } = useMutation({
    mutationKey: ['respondToInvitation'],
    mutationFn: async (data: any) => await respondToInvitation(data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['getUserTeam'] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleAccept = (memberId: string) => {
    console.log(`Accepted member with ID: ${memberId}`);
    respondToInvitationMutate({ memberId, action: 'accept' });
    setAction('accept');
    setIsSelectedMemberId(memberId);
  };

  const handleReject = (memberId: string) => {
    console.log(`Rejected member with ID: ${memberId}`);
    respondToInvitationMutate({ memberId, action: 'reject' });
    setAction('reject');
    setIsSelectedMemberId(memberId);
  };

  return (
    <div className="bg-[#330B45] rounded-lg overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-[#4A0D63] text-left">
            <th className="p-3">Team Mates</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">Status</th>
            <th className="w-[300px] p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member: any) => (
            <tr key={member.id} className="border-b border-[#4A0D63]">
              <td className="p-3">
                {member?.user.name}
                {userTeamData?.captain?.id === member?.user.id && ' - Captain'}
              </td>
              <td className="p-3">{member?.user.gender}</td>
              <td className="p-3">{member?.user.age}</td>
              <td className="p-3">{member?.user.phoneNumber}</td>
              <td className="p-3">
                <Badge
                  variant={member?.status === 'pending' ? 'outline' : 'default'}
                >
                  {toCapitalize(member?.status)}
                </Badge>
              </td>
              <td className="p-3 flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => handleAccept(member.id)}
                  disabled={
                    member?.status !== 'pending' ||
                    member?.user?.email !== session?.user?.email
                  }
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 cursor-pointer"
                >
                  {isRespondToInvitationMutatePending &&
                  isSelectedMemberId === member.id &&
                  action === 'accept' ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      <span>Accepting...</span>
                    </div>
                  ) : (
                    'Accept'
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => handleReject(member.id)}
                  disabled={
                    member?.status !== 'pending' ||
                    member?.user?.email !== session?.user?.email
                  }
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded cursor-pointer"
                >
                  {isRespondToInvitationMutatePending &&
                  isSelectedMemberId === member.id &&
                  action === 'reject' ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      <span>Rejecting...</span>
                    </div>
                  ) : (
                    'Reject'
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
