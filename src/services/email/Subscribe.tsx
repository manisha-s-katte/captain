import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Heading,
    Link,
  } from "@react-email/components";
  import * as React from "react";
  
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const CaptainsideWelcomeEmail = () => (
    <Html>
      <Head />
      <Preview>
        Welcome to Captainside Gaming - Your Gateway to Competitive Gaming! 🎮
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://wteevsttakocypgyobcb.supabase.co/storage/v1/object/public/images/logo.png"
            width="200"
            height="100"
            alt="Captainside Gaming Logo"
            style={logo}
          />
          
          <Text style={paragraph}>Hi,</Text>
  
          <Heading style={heading}>
            Welcome to Captainside Gaming! 🎮
          </Heading>
  
          <Text style={paragraph}>
            You're now part of an epic gaming community where tournaments come to life. 
            By joining our newsletter, you'll get exclusive updates on everything happening 
            in the competitive gaming scene.
          </Text>
  
          <Section style={featuresContainer}>
            <Heading as="h2" style={subHeading}>
              Stay Updated With:
            </Heading>
            
            <Text style={listItem}>
              <span style={emoji}>🏆</span> 
              Upcoming tournament schedules and registration dates
            </Text>
            <Text style={listItem}>
              <span style={emoji}>🎯</span> 
              Live event notifications and match highlights
            </Text>
            <Text style={listItem}>
              <span style={emoji}>⭐</span> 
              Early access to special gaming events
            </Text>
            <Text style={listItem}>
              <span style={emoji}>💰</span> 
              Prize pool announcements
            </Text>
            <Text style={listItem}>
              <span style={emoji}>👥</span> 
              Team formation opportunities
            </Text>
            <Text style={listItem}>
              <span style={emoji}>🎓</span> 
              Community spotlights and pro-gaming tips
            </Text>
          </Section>
  
          <Text style={highlightText}>
            Get ready to level up your gaming experience!
          </Text>
  
          <Section style={btnContainer}>
            <Button style={button} href="https://captainside.com/events">
              View Upcoming Tournaments
            </Button>
          </Section>
  
          <Text style={paragraph}>
            Best,
            <br />
            The Captainside Team
          </Text>
  
          <Hr style={hr} />
  
          <Text style={footer}>
            Don't want to receive these updates?{' '}
            <Link style={footerLink} href="#">Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
 
  export default CaptainsideWelcomeEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
    display: "block",
    maxWidth: "100%",
    height: "auto",
  };
  
  const heading = {
    color: "#D600E1",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center" as const,
    fontWeight: "bold",
  };
  
  const subHeading = {
    color: "#D600E1",
    fontSize: "18px",
    marginBottom: "15px",
    fontWeight: "bold",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#000000",
  };
  
  const featuresContainer = {
    background: "#350949",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  };
  
  const listItem = {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
  };
  
  const emoji = {
    color: "#D600E1",
    marginRight: "10px",
  };
  
  const highlightText = {
    fontSize: "18px",
    textAlign: "center" as const,
    marginTop: "30px",
    color: "#D600E1",
    fontWeight: "bold",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
    marginTop: "30px",
  };
  
  const button = {
    backgroundColor: "#D600E1",
    borderRadius: "5px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 24px",
    fontWeight: "bold",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    textAlign: "center" as const,
  };
  
  const footerLink = {
    color: "#D600E1",
    textDecoration: "none",
  };