import styles from '../src/styles.module.css';
import {Personalization, Slot, useContent, useEvaluation} from '@croct/plug-react';  
import { Fragment, ReactElement, Suspense, useCallback } from 'react';
import {useCroct} from '@croct/plug-react';
import React from 'react';

type HomeBannerContent = {
  title: string,
  subtitle: string,
  cta: {
      label: string,
      link: string,
  },
};

function App() {

  const croct = useCroct();
  const setPersonaDeveloper = useCallback(
      () => croct.user.edit()
          .set('custom.persona', 'developer')
          .save(),
      [croct],
  );
  
  const setPersonaNoDeveloper = useCallback(
      () => croct.user.edit()
          .set('custom.persona', 'nonDeveloper')
          .save(),
      [croct],
  );

    croct.evaluate<string>("location's city")
    .then( location => console.log(location));

    function ViewOrigemRegion() : ReactElement {
        const origemLocation = useEvaluation<boolean>("location's city", {fallback:false})
        console.log(origemLocation)
        return (
            origemLocation
                ? <p>{origemLocation}</p>
                : <p>test</p>
        ) 
    }
   
    croct.evaluate('today').then(today => (console.log(today)))

 
    function ViewDocsLink(): ReactElement {

    const isDeveloper = useEvaluation<boolean>("user's persona is 'developer'", {fallback: false});
    

    return (
        isDeveloper
            ? <a href="/docs">View docs</a>
            : <a href="/share">Share with your developer</a>
    );
    }
  return (
    <div className={styles.content}>
        <Suspense fallback="✨ Personalizing...">
            <Personalization  expression="user's persona is 'developer'" fallback={false}>
                {(isDeveloper: boolean) => (
                    <Fragment>
                        {isDeveloper ? <a className={styles.a} href="/docs">View docs</a> : <a href="/share">Share with your developer</a> }
                    </Fragment>
                )}
            </Personalization>
            <Slot id="home-banner">
                {({title, subtitle, cta}: HomeBannerContent) => (
                    <div>
                        <strong>{title}</strong>
                        <p>{subtitle}</p>
                        <a href={cta.link}>{cta.label}</a>
                    </div>
                )}
            </Slot>
            <div>
               <ViewDocsLink />
               <ViewOrigemRegion />
            </div>     
            <div>
                <button onClick={setPersonaDeveloper}>I'm a developer</button>
            </div>
            <div>
                 <button onClick={setPersonaNoDeveloper}>I'm not a developer</button>
            </div>
            <div></div>
          </Suspense>
      </div>
    
  )
}

export default App
