import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: "PADARTHI AAKASH",
      role: "FRONT-END Developer",
      email: "aakashpadarti@gmail.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQufoeLzTlBATvAUDLZsCCxMEWHl--yHDFW6R2tx09AEs6XLQe26xH6y91PEZmjpy1ndYQ&usqp=CAU",
      github: "https://github.com/saiteja",
      linkedin: "https://linkedin.com/in/saiteja",
      skills: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
      description: "Frontend specialist focused on creating responsive and intuitive user interfaces. Lead designer for the EventFlow user experience."
    },
    {
      name: "PASUPULETI REVANTH VENKAT",
      role: "Full Stack Developer",
      email: "prvenkat113@gmail.com",
      image: "https://static.vecteezy.com/system/resources/previews/024/959/971/non_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg",
      github: "https://github.com/saikiran",
      linkedin: "https://linkedin.com/in/saikiran",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      description: "Experienced full-stack developer specializing in MERN stack development. Team lead and architecture designer for the EventFlow platform."
    },
    {
      name: "NALLURI NAGASAI",
      role: "Backend Developer",
      email: "nagasai.nalluri@gmail.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Gzg39YL5MWAoUpmingPwYaLsuaUVbZG9MfbTOdaeewywGGwyocgQOEpHOxKzRJAIG-Q&usqp=CAU",
      github: "https://github.com/saikrishna",
      linkedin: "https://linkedin.com/in/saikrishna",
      skills: ["Node.js", "MongoDB", "Express", "API Design"],
      description: "Backend expert specializing in database design and API development. Core developer of EventFlow's booking system."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">About EventFlow</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your premier destination for seamless event management and booking experiences.
              Built by developers who understand the importance of creating memorable events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              EventFlow was born from a simple idea: to make event management and booking 
              as seamless as possible. Our team of three passionate developers came together 
              during a hackathon, combining our expertise in full-stack development to create 
              a platform that serves both event organizers and attendees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center p-6 rounded-lg bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize the event management industry by providing cutting-edge 
                technology solutions that make organizing and attending events a seamless experience.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading platform for event management and booking, known for 
                our innovative solutions and exceptional user experience.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Innovation, reliability, and user-centric design are at the core of 
                everything we do. We believe in creating value through technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                      whileHover={{ scale: 1.05 }}
                    />
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>

                  <p className="text-gray-600 text-center mb-6">{member.description}</p>

                  <div className="space-y-4">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
  <div className="flex items-center justify-center space-x-4">
    <a
      href={member.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900"
    >
      <FaGithub className="w-6 h-6" />
    </a>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900"
    >
      <FaLinkedin className="w-6 h-6" />
    </a>
    <a 
      href={`mailto:${member.email}`} 
      className="text-gray-600 hover:text-gray-900"
    >
      <FaEnvelope className="w-6 h-6" />
    </a>
  </div>
</div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;