"use client";

import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import MenuSection from './components/MenuSection';
import MysteryBoxSection from './components/MysteryBoxSection';
import ClubSection from './components/ClubSection';
import Footer from './components/Footer';

export default function Ejemplo6Page() {
    return (
        <div className="ejemplo6-wrapper">
            <Header />
            <Hero />
            <Marquee />
            <MenuSection />
            <MysteryBoxSection />
            <ClubSection />
            <Footer />
        </div>
    );
}
