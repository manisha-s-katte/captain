'use client';
import React, { Fragment, useEffect } from 'react';
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import { Bell } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationsAsRead } from '@/http/api';
import Link from 'next/link';

export function NotificationDropdown({ notifications }: any) {
  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleOpen = () => {
    const unreadNotifications = notifications
      .filter((n: any) => !n.read)
      .map((n: any) => n.id);
    if (unreadNotifications.length > 0) {
      markAsRead(unreadNotifications);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          onClick={handleOpen}
          className="relative p-2 bg-transparent hover:bg-transparent focus:outline-none"
        >
          <Bell className="h-5 w-5 text-white" />
          {notifications.filter((n: any) => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#D600E1] text-white text-xs rounded-full">
              {notifications.filter((n: any) => !n.read).length}
            </span>
          )}
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute md:right-0 mt-2 w-72 origin-top-right bg-[#310F43] border border-[#D600E1] text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <div className="px-4 py-2 text-sm font-medium">Notifications</div>
            <div className="border-t border-[#D600E1]" />
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="px-4 py-2 text-sm">No new notifications</div>
              ) : (
                notifications.map((notification: any) => (
                  <MenuItem key={notification.id}>
                    {() => (
                      <Link
                        href={`/events/${notification?.user?.teamMembers[0]?.team?.tournamentId}`}
                        className={`block px-4 py-2 text-sm hover:bg-[#D600E1] hover:bg-opacity-20 cursor-pointer transition-colors duration-200 ${
                          !notification.read ? 'font-bold' : ''
                        }`}
                      >
                        <div className="font-semibold">
                          {notification.title}
                        </div>
                        <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                          {notification.message}
                        </div>
                      </Link>
                    )}
                  </MenuItem>
                ))
              )}
            </div>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default function Notification() {
  const queryClient = useQueryClient();
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => getNotifications(),
    refetchInterval: 60000,
  });

  return <NotificationDropdown notifications={notifications || []} />;
}
