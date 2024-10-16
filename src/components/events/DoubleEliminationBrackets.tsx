'use client';
import {
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets';
import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

const matchesMockData = {
  upper: [
    {
      id: 1,
      name: 'Upper Round 1 - Match 1',
      nextMatchId: 5,
      nextLooserMatchId: 8,
      tournamentRoundText: '1',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-1-1',
          name: 'Team 1-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-1-2',
          name: 'Team 1-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 2,
      name: 'Upper Round 1 - Match 2',
      nextMatchId: 5,
      nextLooserMatchId: 8,
      tournamentRoundText: '1',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-2-1',
          name: 'Team 2-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-2-2',
          name: 'Team 2-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 3,
      name: 'Upper Round 1 - Match 3',
      nextMatchId: 6,
      nextLooserMatchId: 9,
      tournamentRoundText: '1',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-3-1',
          name: 'Team 3-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-3-2',
          name: 'Team 3-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 4,
      name: 'Upper Round 1 - Match 4',
      nextMatchId: 6,
      nextLooserMatchId: 9,
      tournamentRoundText: '1',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-4-1',
          name: 'Team 4-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-4-2',
          name: 'Team 4-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 5,
      name: 'Upper Round 2 - Match 1',
      nextMatchId: 7,
      nextLooserMatchId: 10,
      tournamentRoundText: '2',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-5-1',
          name: 'Team 5-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-5-2',
          name: 'Team 5-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 6,
      name: 'Upper Round 2 - Match 2',
      nextMatchId: 7,
      nextLooserMatchId: 10,
      tournamentRoundText: '2',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-6-1',
          name: 'Team 6-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-6-2',
          name: 'Team 6-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 7,
      name: 'Upper Round 3 - Match 1',
      nextMatchId: null,
      nextLooserMatchId: null,
      tournamentRoundText: '3',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-7-1',
          name: 'Team 7-1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-7-2',
          name: 'Team 7-2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
  ],
  lower: [
    {
      id: 8,
      name: 'Lower Round 1 - Match 1',
      nextMatchId: 10,
      nextLooserMatchId: null,
      tournamentRoundText: '1',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-8-1',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-8-2',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 9,
      name: 'Lower Round 2 - Match 1',
      nextMatchId: 10,
      nextLooserMatchId: null,
      tournamentRoundText: '2',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-9-1',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-9-2',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 10,
      name: 'Lower Round 3 - Match 1',
      nextMatchId: 7,
      nextLooserMatchId: null,
      tournamentRoundText: '3',
      startTime: '2024-10-16T06:15:24.982Z',
      state: 'DONE',
      participants: [
        {
          id: 'team-10-1',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team-10-2',
          name: 'TBD',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
  ],
};

const theme = createTheme({
  textColor: { main: '#FFFFFF', highlighted: '#FFFFFF', dark: '#FFFFFF' },
  matchBackground: {
    wonColor: '#2A0A38',
    lostColor: '#2A0A38',
    defaultColor: '#1A0024',
  },
  score: {
    background: {
      wonColor: '#2A0A38',
      lostColor: '#2A0A38',
    },
    text: { highlightedWonColor: '#FFFFFF', highlightedLostColor: '#FFFFFF' },
  },
  border: {
    color: '#FFD700', // Gold color for borders
    highlightedColor: '#FFD700',
  },
  roundHeader: { backgroundColor: '#2A0A', fontColor: '#FFFFFF' },
  connectorColor: '#FFD700', // Gold color for connectors
  connectorColorHighlight: '#FFD700',
  svgBackground: '#1A0024', // Dark purple background
});

export const DoubleEliminationBrackets = ({ matches }: { matches: any }) => {
  const [updatedMatches, setUpdatedMatches] = useState(matchesMockData);
  const size = useWindowSize();
  const finalWidth = size?.width && size.width * 0.9;
  const finalHeight = size?.height && size.height * 0.9;

  return (
    <DoubleEliminationBracket
      matches={updatedMatches}
      theme={theme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: theme.roundHeader.backgroundColor, //* this is not changing
            fontColor: theme.roundHeader.fontColor,
          },
          connectorColor: theme.connectorColor,
          connectorColorHighlight: theme.connectorColorHighlight,
        },
      }}
      matchComponent={Match}
      svgWrapper={({ children, ...props }: any) => (
        <SVGViewer
          background={theme.svgBackground}
          SVGBackground={theme.svgBackground}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
};
