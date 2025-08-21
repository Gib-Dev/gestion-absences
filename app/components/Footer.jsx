"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { 
    AiOutlineHome, 
    AiOutlineDashboard, 
    AiOutlineUser, 
    AiOutlineMail, 
    AiOutlinePhone,
    AiOutlineGithub,
} from "react-icons/ai";
import { BiBarChart } from "react-icons/bi";
import { UI_TEXTS } from "@/constants";
import { useState, useEffect } from "react";

export default function Footer() {
    const { isAuthenticated } = useAuth();
    // Use useEffect to avoid hydration mismatch
    const [currentYear, setCurrentYear] = useState('');
    
    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    const FooterSection = ({ title, children, className = "" }) => (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-lg font-semibold text-magenta border-b-2 border-magenta pb-2">
                {title}
            </h3>
            {children}
        </div>
    );

    const FooterLink = ({ href, children, icon: Icon, className = "" }) => (
        <Link 
            href={href} 
            className={`flex items-center text-night hover:text-magenta transition-colors duration-200 ease-in-out group ${className}`}
        >
            {Icon && <Icon className="mr-2 group-hover:scale-110 transition-transform duration-200" />}
            {children}
        </Link>
    );

    return (
        <footer className="bg-white border-t-2 border-ghostwhite mt-auto">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <FooterSection title={UI_TEXTS.FOOTER.SECTIONS.COMPANY_INFO} className="lg:col-span-1">
                        <Link href="/" className="flex items-center mb-4 group hover:scale-105 transition-transform duration-200">
                            <Image 
                                src="/images/Logo.webp" 
                                alt="Gestion Absences" 
                                width={40} 
                                height={40} 
                                className="rounded-full shadow-md"
                            />
                            <span className="ml-3 text-lg font-bold text-magenta group-hover:text-magenta/80 transition-colors duration-200">
                                Gestion Absences
                            </span>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {UI_TEXTS.FOOTER.COMPANY_DESCRIPTION}
                        </p>
                        
                                                 {/* Social Links */}
                         <div className="flex space-x-4 mt-4">
                             <a 
                                 href="https://github.com/Gib-Dev/gestion-absences" 
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-gray-400 hover:text-magenta transition-colors duration-200"
                                 aria-label="GitHub"
                             >
                                 <AiOutlineGithub className="w-5 h-5" />
                             </a>
                         </div>
                    </FooterSection>

                    {/* Quick Links */}
                    <FooterSection title={UI_TEXTS.FOOTER.SECTIONS.QUICK_LINKS}>
                        <FooterLink href="/" icon={AiOutlineHome}>
                            Accueil
                        </FooterLink>
                        
                        {isAuthenticated && (
                            <>
                                <FooterLink href="/dashboard" icon={AiOutlineDashboard}>
                                    Tableau de bord
                                </FooterLink>
                                <FooterLink href="/statistics" icon={BiBarChart}>
                                    Statistiques
                                </FooterLink>
                                <FooterLink href="/profile" icon={AiOutlineUser}>
                                    Profil
                                </FooterLink>
                            </>
                        )}
                        
                        {!isAuthenticated && (
                            <>
                                <FooterLink href="/auth/login" icon={AiOutlineUser}>
                                    Connexion
                                </FooterLink>
                                <FooterLink href="/auth/register" icon={AiOutlineUser}>
                                    Inscription
                                </FooterLink>
                            </>
                        )}
                    </FooterSection>

                    {/* Features */}
                    <FooterSection title={UI_TEXTS.FOOTER.SECTIONS.FEATURES}>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-magenta rounded-full mr-3"></div>
                                {UI_TEXTS.FOOTER.FEATURES.ABSENCE_MANAGEMENT}
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-magenta rounded-full mr-3"></div>
                                {UI_TEXTS.FOOTER.FEATURES.DASHBOARDS}
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-magenta rounded-full mr-3"></div>
                                {UI_TEXTS.FOOTER.FEATURES.ADVANCED_STATS}
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-magenta rounded-full mr-3"></div>
                                {UI_TEXTS.FOOTER.FEATURES.EXPORTABLE_REPORTS}
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-magenta rounded-full mr-3"></div>
                                {UI_TEXTS.FOOTER.FEATURES.RESPONSIVE_INTERFACE}
                            </div>
                        </div>
                    </FooterSection>

                    {/* Contact Info */}
                    <FooterSection title={UI_TEXTS.FOOTER.SECTIONS.CONTACT}>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center">
                                <AiOutlineMail className="mr-3 text-magenta" />
                                <span>contact@gestion-absences.com</span>
                            </div>
                            <div className="flex items-center">
                                <AiOutlinePhone className="mr-3 text-magenta" />
                                <span>+1 (514) 123-4567 </span>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-ghostwhite rounded-lg">
                            <p className="text-xs text-gray-500">
                                {UI_TEXTS.FOOTER.SUPPORT_HOURS}
                            </p>
                        </div>
                    </FooterSection>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-ghostwhite bg-ghostwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-600">
                            © {currentYear} Gestion Absences. {UI_TEXTS.FOOTER.COPYRIGHT}
                        </div>
                        
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-600 hover:text-magenta transition-colors duration-200">
                                {UI_TEXTS.FOOTER.LINKS.PRIVACY}
                            </Link>
                            <Link href="/terms" className="text-gray-600 hover:text-magenta transition-colors duration-200">
                                {UI_TEXTS.FOOTER.LINKS.TERMS}
                            </Link>
                            <Link href="/help" className="text-gray-600 hover:text-magenta transition-colors duration-200">
                                {UI_TEXTS.FOOTER.LINKS.HELP}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
