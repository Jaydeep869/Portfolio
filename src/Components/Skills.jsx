import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiJavascript, SiMysql, SiPostgresql } from "react-icons/si";

const Skills = () => {
  const skills = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "React", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Python", icon: <FaPython /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="skills-page"
    >
      <div className="gradient-text animated-text skills-container ">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="skills-title"
        >
          Technical Toolkit
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="skills-description"
        >
          Technologies I'm currently working with and continuously exploring
        </motion.p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="skill-card"
            >
              <div className="skill-icon-container">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
