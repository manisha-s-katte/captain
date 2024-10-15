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
      nextLooserMatchId: 5,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team1',
          name: 'Team 1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team2',
          name: 'Team 2',
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
      nextLooserMatchId: 6,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team3',
          name: 'Team 3',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team4',
          name: 'Team 4',
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
      nextLooserMatchId: 8,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team5',
          name: 'Team 5',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team6',
          name: 'Team 6',
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
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team7',
          name: 'Team 7',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team8',
          name: 'Team 8',
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
      nextLooserMatchId: 8,
      tournamentRoundText: '2',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team9',
          name: 'Team 9',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team10',
          name: 'Team 10',
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
      nextLooserMatchId: 8,
      tournamentRoundText: '2',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team11',
          name: 'Team 11',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team12',
          name: 'Team 12',
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
      nextLooserMatchId: 8,
      tournamentRoundText: '3',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team13',
          name: 'Team 13',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'team14',
          name: 'Team 14',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 8,
      name: 'Final',
      nextMatchId: null,
      nextLooserMatchId: null,
      tournamentRoundText: 'Final',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'upperWinner',
          name: 'Upper Bracket Winner',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'lowerWinner',
          name: 'Lower Bracket Winner',
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
      nextMatchId: 12,
      nextLooserMatchId: null,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'loser1',
          name: 'Loser of Match 1',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser2',
          name: 'Loser of Match 2',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 9,
      name: 'Lower Round 1 - Match 2',
      nextMatchId: 12,
      nextLooserMatchId: null,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'loser3',
          name: 'Loser of Match 3',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser4',
          name: 'Loser of Match 4',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 10,
      name: 'Lower Round 1 - Match 3',
      nextMatchId: 13,
      nextLooserMatchId: null,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'loser5',
          name: 'Loser of Match 5',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser6',
          name: 'Loser of Match 6',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 11,
      name: 'Lower Round 1 - Match 4',
      nextMatchId: 13,
      nextLooserMatchId: null,
      tournamentRoundText: '1',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'loser7',
          name: 'Loser of Match 7',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser8',
          name: 'Loser of Match 8',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 12,
      name: 'Lower Round 2 - Match 1',
      nextMatchId: 14,
      nextLooserMatchId: null,
      tournamentRoundText: '2',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'winner10',
          name: 'Winner of Match 10',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser6',
          name: 'Loser of Match 6',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 13,
      name: 'Lower Round 2 - Match 2',
      nextMatchId: 14,
      nextLooserMatchId: null,
      tournamentRoundText: '2',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'winner11',
          name: 'Winner of Match 11',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'loser7',
          name: 'Loser of Match 7',
          resultText: null,
          isWinner: false,
          status: null,
        },
      ],
    },
    {
      id: 14,
      name: 'Lower Round 3 - Match 1',
      nextMatchId: 7,
      nextLooserMatchId: null,
      tournamentRoundText: '3',
      startTime: '2024-10-15T10:17:31.275Z',
      state: 'SCHEDULED',
      participants: [
        {
          id: 'winner12',
          name: 'Winner of Match 12',
          resultText: null,
          isWinner: false,
          status: null,
        },
        {
          id: 'winner13',
          name: 'Winner of Match 13',
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
