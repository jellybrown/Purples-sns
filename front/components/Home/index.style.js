import styled from "styled-components";

// Main
export const MainHomeWrapper = styled.div`
  position: relative;
`;

export const PCScreen = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: calc(10% + 320px);
`;

export const MobileScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-left: 0px;
  padding-left: 0px;
`;

export const UserProfile = styled.div`
  position: fixed;
  left: 10%;
  top: 7rem;
`;

// MainLogin
export const LoginWrapper = styled.div`
  width: 40%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
`;

export const LogoWrapper = styled.div`
  text-align: center;
  padding-top: 8em;
`;

export const LoginButtons = styled.div`
  padding-top: 4em;
`;

// MainProfile
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

export const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const UserName = styled.div`
  margin-left: 20px;
  span {
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  padding: 20px 0;
`;

export const FollowBox = styled.div`
  flex-basis: 50%;
`;

export const Title = styled.p`
  font-family: "Yellowtail";
  font-size: 1.3rem;
  margin: 0;
`;

export const Count = styled.span`
  font-family: "Yellowtail";
  font-size: 3rem;
`;
