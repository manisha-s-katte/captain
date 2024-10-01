import {
  Body,
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
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export default function RegisterTournamentEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to captain-side.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={
              'https://wteevsttakocypgyobcb.supabase.co/storage/v1/object/public/images/logo.png'
            }
            width={100}
            height={50}
            alt="captain-side"
          />
          <Heading style={heading}>Successfully Registered</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              You have successfully registered the tournament.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- captainside gaming Team
          </Text>
          <Hr style={hr} />
          <Img
            src={`https://wteevsttakocypgyobcb.supabase.co/storage/v1/object/public/images/logo.png`}
            width={50}
            height={50}
            style={{
              WebkitFilter: 'grayscale(100%)',
              filter: 'grayscale(100%)',
              margin: '20px 0',
            }}
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
  color: '#FF6363',
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
