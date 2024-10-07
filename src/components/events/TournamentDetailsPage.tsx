'use client';

import {
  createTeam,
  getTournamentDetails,
  getUserTeam,
  inviteTeamMate,
  joinTournament,
} from '@/http/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '../Spinner/spinner';
import { format } from 'date-fns';
import {
  FaCalendarAlt,
  FaUsers,
  FaUserFriends,
  FaMoneyBillWave,
  FaFlag,
  FaTrophy,
} from 'react-icons/fa';
import { useState } from 'react';
import TeamsTable from './TeamsTable';
import { toCapitalize } from '@/lib/utils';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Loader2Icon } from 'lucide-react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import UserTeamTable from './UserTeamTable';
import { useSession } from 'next-auth/react';

export default function TournamentDetailsPage({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isInviteMateModalOpen, setIsInviteMateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    teamName: '',
    phoneNumber: '',
    heardFrom: '',
    tournamentId: '',
    teamId: '',
  });

  const {
    data: tournamentsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getTournamentDetails'],
    queryFn: async () => getTournamentDetails(tournamentId),
  });

  const { data: userTeamData, isLoading: isUserTeamDataLoading } = useQuery({
    queryKey: ['getUserTeam'],
    queryFn: async () => getUserTeam(tournamentId),
  });

  console.log('userTeamData', userTeamData);
  console.log('session', session);

  const { mutate: createTeamMutate, isPending: isCreateTeamMutatePending } =
    useMutation({
      mutationKey: ['createTeam'],
      mutationFn: async (data: any) => await createTeam(data),
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['getUserTeam'] });
        queryClient.invalidateQueries({ queryKey: ['getTournamentDetails'] });
        toast.success(data.message);
        setFormData({
          name: '',
          gender: '',
          age: '',
          email: '',
          teamName: '',
          phoneNumber: '',
          heardFrom: '',
          tournamentId: '',
          teamId: '',
        });
        setIsCreateTeamModalOpen(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || error?.message);
        if (error.response.status === 401) {
          router.push('/login');
        }
      },
    });

  const {
    mutate: inviteTeamMateMutate,
    isPending: isInviteTeamMateMutatePending,
  } = useMutation({
    mutationKey: ['inviteTeamMate'],
    mutationFn: async (data: any) => await inviteTeamMate(data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['getUserTeam'] });
      toast.success(data.message);
      setFormData({
        name: '',
        gender: '',
        age: '',
        email: '',
        teamName: '',
        phoneNumber: '',
        heardFrom: '',
        tournamentId: '',
        teamId: '',
      });
      setIsInviteMateModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
      if (error.response.status === 401) {
        router.push('/login');
      }
    },
  });

  if (isError) {
    if (error) {
      toast.error((error as any)?.response?.data?.message || error.message);
    }
    if ((error as any)?.response?.status === 401) {
      router.push('/login');
    }
    return;
  }

  const handleCloseDialogOfTeamCreation = () => {
    setIsCreateTeamModalOpen(false);
  };

  const handleCloseDialogOfTeamMateCreation = () => {
    setIsInviteMateModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitOfTeamCreation = (
    e: React.FormEvent,
    tournamentId: string
  ) => {
    e.preventDefault();
    console.log('Form submitted:', formData, tournamentId);
    createTeamMutate({ ...formData, tournamentId });
  };

  const handleSubmitOfTeamMateCreation = (
    e: React.FormEvent,
    teamId: string
  ) => {
    e.preventDefault();
    console.log('Form submitted:', formData, teamId);
    inviteTeamMateMutate({ ...formData, teamId });
  };

  return (
    <main>
      <div className="mt-8 mx-4 lg:mx-16">
        <h1 className="text-3xl font-semibold mb-6">Tournament Details</h1>
        {isLoading || isUserTeamDataLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-[#2A0A3A] bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-[#60078C] mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h2 className="text-xl md:text-2xl tracking-tight view_all font-semibold mb-2">
                    {tournamentsData?.title}
                  </h2>
                  <p className="text-[#AA9DA9] text-base">
                    {tournamentsData?.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                  <p className="text-white">
                    Entry Fee: {tournamentsData?.entryFee} INR
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-red-500 mr-3 text-xl" />
                  <p className="text-white">
                    Date:{' '}
                    {tournamentsData?.startDate &&
                      format(
                        new Date(tournamentsData?.startDate),
                        'd MMM'
                      )}{' '}
                    -{' '}
                    {tournamentsData?.startDate &&
                      format(new Date(tournamentsData?.endDate), 'd MMM')}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-yellow-500 mr-3 text-xl" />
                  <p className="text-white">
                    Max Teams: {tournamentsData?.maxNofTeams}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUserFriends className="text-yellow-500 mr-3 text-xl" />
                  <p className="text-white">
                    Players per Team: {tournamentsData?.maxNofPlayersPerTeam}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                  <p className="text-white">
                    Prize Pool: {tournamentsData?.prize || 'TBD'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaFlag className="text-blue-500 mr-3 text-xl" />
                  <p className="text-white">
                    Game Pass: {tournamentsData?.gamePass?.title}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaTrophy className="text-yellow-600 mr-3 text-xl" />
                  <p className="text-white">
                    Mode:{' '}
                    {tournamentsData?.tournamentType &&
                      toCapitalize(tournamentsData?.tournamentType)}
                  </p>
                </div>
              </div>
            </div>
            {userTeamData && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Your Team: {userTeamData?.name}
                  </h2>
                  {session?.data?.user?.email ===
                    userTeamData?.captain?.email && (
                    <button
                      onClick={() => setIsInviteMateModalOpen(true)}
                      className="bg-[#D600E1] text-white px-4 py-2 rounded-lg hover:bg-[#A800B3]"
                    >
                      Invite Mates
                    </button>
                  )}
                </div>
                <UserTeamTable userTeamData={userTeamData} />
              </div>
            )}

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Participating Teams
                </h2>
                <button
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="bg-[#D600E1] text-white px-4 py-2 rounded-lg hover:bg-[#A800B3]"
                >
                  Create Team
                </button>
              </div>
              <TeamsTable teamsData={tournamentsData?.registrations} />
            </div>

            <Transition appear show={isCreateTeamModalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                onClose={handleCloseDialogOfTeamCreation}
              >
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-75" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-tr from-[#60078C] to-[#1A0226] p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <DialogTitle
                            as="h3"
                            className="text-2xl font-medium leading-6 text-white"
                          >
                            Create Team
                          </DialogTitle>
                          <button
                            onClick={handleCloseDialogOfTeamCreation}
                            className="text-white hover:text-gray-300 focus:outline-none"
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <form
                          onSubmit={(e) => {
                            handleSubmitOfTeamCreation(e, tournamentId);
                          }}
                          className="mt-4 space-y-4"
                        >
                          <input
                            type="text"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleInputChange}
                            placeholder="Team Name"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#350949] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <select
                            name="heardFrom"
                            value={formData.heardFrom}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#350949] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          >
                            <option value="" disabled>
                              How did you hear about Captain Side Gaming?
                            </option>
                            <option value="youtube">YouTube</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="x">X</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={isCreateTeamMutatePending}
                              className="w-full px-4 py-2 bg-[#FCCC4C] text-black font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#60078C]"
                            >
                              {isCreateTeamMutatePending ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Loader2Icon className="h-4 w-4 animate-spin" />
                                  <span>Creating...</span>
                                </div>
                              ) : (
                                'Create'
                              )}
                            </button>
                          </div>
                        </form>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>

            <Transition appear show={isInviteMateModalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                onClose={handleCloseDialogOfTeamMateCreation}
              >
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-75" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-tr from-[#60078C] to-[#1A0226] p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <DialogTitle
                            as="h3"
                            className="text-2xl font-medium leading-6 text-white"
                          >
                            Invite Team Mate
                          </DialogTitle>
                          <button
                            onClick={handleCloseDialogOfTeamMateCreation}
                            className="text-white hover:text-gray-300 focus:outline-none"
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                        <form
                          onSubmit={(e) => {
                            handleSubmitOfTeamMateCreation(e, userTeamData?.id);
                          }}
                          className="mt-4 space-y-4"
                        >
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#350949] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                            required
                          />
                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={isInviteTeamMateMutatePending}
                              className="w-full px-4 py-2 bg-[#FCCC4C] text-black font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#60078C]"
                            >
                              {isInviteTeamMateMutatePending ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Loader2Icon className="h-4 w-4 animate-spin" />
                                  <span>Sending...</span>
                                </div>
                              ) : (
                                'Send'
                              )}
                            </button>
                          </div>
                        </form>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        )}
      </div>
    </main>
  );
}
