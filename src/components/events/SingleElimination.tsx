'use client';
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets';
import { useWindowSize } from '@uidotdev/usehooks';

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

export const SingleElimination = ({ matches }: { matches: any }) => {
  const size = useWindowSize();
  const finalWidth = size?.width && size.width * 0.9;
  const finalHeight = size?.height && size.height * 0.9;

  return (
    <SingleEliminationBracket
      matches={matches}
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
