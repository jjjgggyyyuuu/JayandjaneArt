import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SeoHead from '../components/SeoHead';

const About = () => {
  // Intersection Observer hooks for animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'Founder & Creative Director',
      bio: 'With over 15 years of experience in the art world, Jane brings her passion for contemporary art and keen eye for emerging talent to Jay & Jane Studio.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
    },
    {
      id: 2,
      name: 'Jay Roberts',
      role: 'Co-Founder & Curator',
      bio: 'Jay\'s background in fine arts and museum curation brings a unique perspective to our gallery selection and exhibition design.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
    },
    {
      id: 3,
      name: 'Alex Johnson',
      role: 'Gallery Manager',
      bio: 'Alex ensures the smooth operation of our gallery, overseeing exhibitions, client relations, and artist coordination.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80'
    },
    {
      id: 4,
      name: 'Morgan Chen',
      role: 'Art Consultant',
      bio: 'With a background in art history and interior design, Morgan helps clients find the perfect artwork to complement their space and vision.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
    }
  ];
  
  // Our values data
  const values = [
    {
      title: 'Artistic Excellence',
      description: 'We believe in the power of exceptional art to transform spaces and lives. We curate our collection with a commitment to the highest quality and artistic merit.'
    },
    {
      title: 'Artistic Integrity',
      description: 'We respect the creative vision of our artists and maintain the highest ethical standards in our representation and business practices.'
    },
    {
      title: 'Inclusivity',
      description: 'We believe art should be accessible to everyone. We strive to create a welcoming environment where people from all backgrounds can connect with and be moved by art.'
    },
    {
      title: 'Innovation',
      description: 'We embrace new ideas, technologies, and approaches in the art world, constantly evolving our practices to better serve artists and collectors.'
    }
  ];
  
  return (
    <>
      <SeoHead 
        title="About Us"
        description="Learn about Jay and Jane Art Studio, our history, mission, and the team behind our contemporary art gallery."
      />
      
      <div className="about">
        {/* Hero Section */}
        <section 
          className="about__hero" 
          ref={heroRef}
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1514195037031-83d60ed3b448?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80')` 
          }}
        >
          <div className="container">
            <motion.div 
              className="about__hero-content"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h1 variants={fadeInUp}>About Us</motion.h1>
              <motion.p variants={fadeInUp}>
                Jay & Jane Art Studio was founded with a passion for contemporary art and a vision to create a space where artists and art enthusiasts could connect, explore, and be inspired.
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="about__story" ref={storyRef}>
          <div className="container">
            <div className="about__story-inner">
              <motion.div 
                className="about__story-content"
                initial="hidden"
                animate={storyInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp}>Our Story</motion.h2>
                
                <motion.p variants={fadeInUp}>
                  Founded in 2020 by Jane Smith and Jay Roberts, Jay & Jane Art Studio emerged from a shared vision to create a contemporary art gallery that would showcase exceptional artistic talent while fostering a vibrant community of art lovers.
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  What began as a small pop-up gallery has evolved into a respected art destination, known for its carefully curated exhibitions, dedication to artistic innovation, and commitment to supporting both established and emerging artists.
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  Located in the heart of Art City, our gallery space blends historic architecture with modern design, creating the perfect backdrop for the diverse range of artworks we represent. Each year, we host six major exhibitions alongside a rotation of our permanent collection, ensuring there's always something new to discover.
                </motion.p>
                
                <motion.p variants={fadeInUp}>
                  Beyond exhibitions, we host artist talks, workshops, and community events that engage, educate, and inspire. We believe that art has the power to transform perspectives and create meaningful connections, and we're dedicated to making this experience accessible to all who visit our gallery.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="about__story-image"
                initial={{ opacity: 0, x: 50 }}
                animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                  alt="Jay and Jane Art Studio Gallery Space" 
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="about__values" ref={valuesRef}>
          <div className="container">
            <motion.div 
              className="about__values-header"
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp}>Our Values</motion.h2>
              <motion.p variants={fadeInUp}>
                These core principles guide everything we do at Jay & Jane Art Studio, from selecting artworks to interacting with our community.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="about__values-grid"
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="about__values-item"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="about__team" ref={teamRef}>
          <div className="container">
            <motion.div 
              className="about__team-header"
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp}>Meet Our Team</motion.h2>
              <motion.p variants={fadeInUp}>
                Our passionate and dedicated team brings together diverse expertise in art, curation, and gallery management.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="about__team-grid"
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id}
                  className="about__team-member"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="about__team-member-image">
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </div>
                  <div className="about__team-member-info">
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="about__cta" ref={ctaRef}>
          <div className="container">
            <motion.div 
              className="about__cta-inner"
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp}>Visit Our Gallery</motion.h2>
              <motion.p variants={fadeInUp}>
                We invite you to experience Jay & Jane Art Studio in person. Explore our current exhibitions, meet our team, and discover why art enthusiasts from around the world have made us a destination.
              </motion.p>
              <motion.div variants={fadeInUp} className="about__cta-buttons">
                <Link to="/gallery" className="btn">
                  View Gallery
                </Link>
                <Link to="/contact" className="btn btn--secondary">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About; 