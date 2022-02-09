import React, { Fragment } from 'react';
import "./About.css"
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const About = () => {
    const visitGithub = () => {
        window.open("https://github.com/Meet19aug",'_blank').focus();
      };
  return <Fragment>
      <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="/meetProfile.jpg"
              alt="Founder"
            />
            <Typography>Meet Patel</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>
              This is a sample wesbite made by @meetpatel. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://github.com/Meet19aug"
              target="blank"
            >
              <GitHubIcon className="githubSvgIcon" />
            </a>

            <a
              href="https://www.linkedin.com/in/meet-patel-a048231a0/"
              target="blank"
            >
              <LinkedInIcon className="LinkedInSvgIcon" />
            </a>

            <a href="https://www.instagram.com/patel_meet_1908/" target="_blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Fragment>;
};

export default About;
