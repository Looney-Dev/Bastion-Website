import React from 'react';
import SiteHead from '../../components/SiteHead';
import ExternalLink from '../../components/ExternalLink.js';
import meta from './meta.json';
import versions from './versions.json';
import './index.css';

class AddPage extends React.Component {
  render() {
    return (
      <div id='add'>
        <SiteHead
          title={ meta.title }
          description={ meta.description }
          image={ meta.image }
        />

        <div className='header'>
          <h1>Add Clara to Discord</h1>
          <p>
            Add Clara to Discord, and give awesome and sweet perks to your Discord
            server.
          </p>
         
        </div>

        <div className='container'>
          {
            versions.map((version, i) => {
              return (
                <div className='version' key={ i }>
                  <ExternalLink to={ version.url }>
                    <div className='details'>
                      <img src={ version.image } height='128' width='128' alt='' />
                      <h4>{ version.title }</h4>
                      <p>{ version.description }</p>
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

export default AddPage;
