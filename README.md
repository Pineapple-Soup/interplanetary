# **InteR'planetary**   
*Submitted to [Cutie Hack 2024](https://devpost.com/software/inter-planetary)* 🍊 


InteR'planetary is an interactive web application designed to spark curiosity about space science by allowing users to design their own planets and evaluate their habitability based on scientific principles.

---
![img](https://files.catbox.moe/1jzp2s.png)

## **Inspiration**
Our fascination with space exploration and the quest to discover habitable planets inspired InteR'planetary. The theme of CutieHack, "space," fueled our desire to create a hands-on educational tool where users can visualize and manipulate the parameters that influence a planet's habitability.

---

## **What It Does**
InteR'planetary lets users:
- Customize planets by adjusting parameters like mass, radius, distance from a star, and more.
- Calculate a **Habitability Score** based on scientific frameworks, including:
  - The **Statistic-Likelihood Exo-planetary Habitability Index (SEPHI)** ([Rodríguez-Mozos et al. 2017](https://doi.org/10.1093/mnras/stx1910)).
  - The **Habitable Zones Around Main-Sequence Stars** model ([Kopparapu et al. 2013](https://doi.org/10.1088/0004-637X/765/2/131)).
- Interact with a visually engaging spinning globe that responds dynamically to user input.
  
By combining educational insights with interactive visuals, InteR'planetary offers a fun way to explore the science of planetary habitability.

---

## **How We Built It**
- **Frontend**: Built with **React** and **Three.js**, enabling dynamic visuals like a spinning, customizable globe.
- **Backend**: Developed with **Python** using **Flask** to handle calculations based on planetary parameters.
- **Scientific Basis**: The app integrates principles from SEPHI and Habitable Zone models to assess the likelihood of habitability for user-designed planets.

---

## **Challenges**
- **Data Scarcity**: We struggled to find comprehensive datasets on known habitable planets, making machine learning unfeasible.
- **Complex Calculations**: Translating scientific research into code was a challenge, but we overcame it by leveraging statistical likelihood methods.

---

## **Accomplishments**
- Successfully developed a **full-stack application** for the first time, combining frontend visuals with backend computations.
- Created a scientifically accurate tool that aligns with established planetary models.
- Built an engaging and educational experience that merges science with interactivity.

---

## **What We Learned**
- Gained hands-on experience with **full-stack development** and **3D rendering** using Three.js.
- Delved into scientific concepts like the SEPHI index and Habitable Zone calculations.
- Learned how to transform complex mathematical models into interactive, user-friendly applications.

---

## **What's Next**
We aim to expand InteR'planetary by:
- Allowing users to design **custom landmasses** and planetary surfaces.
- Introducing the ability to create and explore **specific solar systems**.
- Incorporating **dynamic asteroid impacts** and other space phenomena for an even more immersive experience.

---

## **Acknowledgments**
- **Habitability Score Calculations**: Based on the [SEPHI Index](https://doi.org/10.1093/mnras/stx1910) and [Habitable Zones Around Main-Sequence Stars](https://doi.org/10.1088/0004-637X/765/2/131).

---

Join us in exploring the cosmos—one custom-built planet at a time! 🚀
