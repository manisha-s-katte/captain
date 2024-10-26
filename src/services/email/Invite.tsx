import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import Image from 'next/image';
import * as React from 'react';

export default function Invite(
  teamName: string,
  captainName: string,
  tournamentName: string
) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to captain-side.</Preview>
      <Body style={main}>
        <Container style={container}>
          <img
            src="https://wteevsttakocypgyobcb.supabase.co/storage/v1/object/public/images/logo.png"
            width="200"
            height="100"
            alt="Captain Side Logo"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />

          <Heading style={heading}>Invitation</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              Exciting news! Yo&#39;ve been invited to join the team{' '}
              <strong>{teamName}</strong> for the upcoming tournament:{' '}
              <strong>{tournamentName}</strong>.
            </Text>
            <Text style={paragraph}>
              Your team captain, <strong>{captainName}</strong>, has personally
              invited you to be part of this exciting journey.
            </Text>
            <Text style={paragraph}>
              Ready to join the action? Click the button below to accept the
              invitation and become part of the team!
            </Text>
            <Button href="https://www.captainside.com/login" style={button}>
              Accept Invitation
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- captainside gaming Team
          </Text>
          <Hr style={hr} />
          <img
            src="https://wteevsttakocypgyobcb.supabase.co/storage/v1/object/public/images/logo.png"
            width="100"
            height="50"
            alt="Captain Side Logo"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
          <Text style={footer}>captainside gaming</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '##D600E1',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};

const button = {
  backgroundColor: '#D600E1',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 24px',
  borderRadius: '4px',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '24px',
};
