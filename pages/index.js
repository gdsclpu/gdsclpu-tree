import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

import styles from '../styles/Home.module.css';
import getConfig from 'next/config';
import {useState} from 'react';

const colors = ['#2196F3', '#F44336', '#FFC107', '#4CAF50'];

export default function Home({ profiles, filesData }) {

const [query,setQuery]=useState([]);
const searchProfile = (event) =>{
  const query = event.target.value;
  setQuery(query);
  //The following function only shows first profile that matches..needs improvement
  for(let i=0;i<filesData.length;i++){
    for(let element=0;element<filesData[i].name.length;element++){
      if((filesData[i].name[element].toLowerCase() == query.toLowerCase())){
        document.getElementById("searchedProfile").innerHTML=
        `<div
            key={index}
            className={styles.profile}
            style={{
              borderColor: colors[Math.floor(Math.random() * (colors.length))]
            }}
          >
            <Image
              src=${filesData[i].avatar}
              alt=${filesData[i].name}
              width={100}
              height={100}
            />
            <h2>${filesData[i].name}</h2>
            <p>${filesData[i].bio}</p>
            <a href=${filesData[i].links[0].url} target='_blank' rel='noopener noreferrer'>${filesData[i].links[0].icon && <FaLinkedin />}</a>
            <a href=${filesData[i].links[1].url} target='_blank' rel='noopener noreferrer'>${filesData[i].links[1].icon && <FaGithub />}</a>
            <a href=${filesData[i].links[2].url} target='_blank' rel='noopener noreferrer'>${filesData[i].links[2].icon && <FaTwitter />}</a>
          </div>`;
      }
    }
  }
  
}
  return (
    <div className={styles.container}>
      <Head>
        <title>GDSC-LPU Tree</title>
        <meta
          name="description"
          content="GDSC-LPU Tree is a website that contains info about community members."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GDSC - LPU Tree!</h1>
        <p>
          <a
            href="https://github.com/gdsclpu/gdsclpu-tree"
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Add your profile
          </a>{' '}
          to join the Tree
        </p>
      </main>

      {/* TODO: Implement search functionality */}
      <section className={styles.search}>
        <input type="text" placeholder="Enter a name" onChange={searchProfile} />
        <p id="searchedProfile">
        </p>
      </section>

      <section className={styles.profiles}>
        {filesData.map((profile, index) => (
          <div
            key={index}
            className={styles.profile}
            style={{
              borderColor: colors[Math.floor(Math.random() * colors.length)]
            }}
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={100}
              height={100}
            />
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
            {profile.links.map((social, index) => (
              <a
                key={index * 56}
                href={social.url}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                {social.icon === 'linkedin' && <FaLinkedin />}
                {social.icon === 'github' && <FaGithub />}
                {social.icon === 'twitter' && <FaTwitter />}
              </a>
            ))}
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <a
          href="https://gdsc.community.dev/lovely-professional-university-jalandhar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © @ Google Developer Student Club - LPU
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  // const profiles = await listReactFiles(__dirname + 'data/');
  // console.log(__dirname);

  const directoryPath = path.join(process.cwd(), './public/data');
  const fileNames = [],
    filesData = [];
  const files = fs.readdirSync(directoryPath);
  files.forEach(function (file) {
    const fileName = file.substring(0, file.indexOf('.'));
    fileNames.push(fileName);
    const fileData = JSON.parse(
      fs.readFileSync(directoryPath + '/' + file, 'utf8')
    );
    filesData.push(fileData);
  });

  return {
    props: {
      // fileNames,
      filesData,
      profiles: 'profiles'
    }
  };
}
