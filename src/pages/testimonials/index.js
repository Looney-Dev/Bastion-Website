import React from 'react';
import SiteHead from '../../components/SiteHead';
import ExternalLink from '../../components/ExternalLink.js';
import meta from './meta.json';
import testimonials from './testimonials.json';
import './index.css';

class TestimonialsPage extends React.Component {
  render() {
    return (
      <div id='testimonials'>
        <SiteHead
          title={ meta.title }
          description={ meta.description }
        />

        <div className='header'>
          <h1>Testimonials</h1>
          <p>
            See how much people love Clara and what they have to say about it.
            <br />
            Wanna share your thoughts? Tweet&nbsp;
            <ExternalLink to='https://twitter.com/JimmyJasonDev'>
              @JimmyJasonDev
            </ExternalLink>
            &nbsp;and your tweets will be posted in this page.
          </p>
        </div>

        <div className='container'>
          {
            testimonials.map((testimonial, i) => {
              return (
                <div className='testimonial' key={ i }>
                  <ExternalLink to={ testimonial.linkToTweet }>
                    <div className='text'>
                      { testimonial.text }
                    </div>
                    <div className='user'>
                      <svg
                        id='testimonial-TwitterLogo'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 400 400'
                        height='25'
                        width='25'
                      >
                        <path
                          fill='#f5f5f5'
                          d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
                        />
                      </svg>
                      <span>{ testimonial.user }</span>
                      <span>{ testimonial.community }</span>
                    </div>
                  </ExternalLink>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TestimonialsPage;
