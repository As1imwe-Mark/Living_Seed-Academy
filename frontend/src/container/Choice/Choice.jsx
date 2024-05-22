import images from '../../constants/images'


const Choice = () => {
  const Reasons = [
    {
      icon: images.teachers,
      title:'Professional Teachers',
      reason: 'Experienced and dedicated teachers who are experts in their field can provide pupils with high-quality instruction, personalized guidance, and mentorship, fostering a conducive learning environment and helping pupils reach their full potential.'
    },
    {
      icon: images.education,
      title: 'Academic Excellence',
      reason: `Highlighting the school's commitment to providing top-notch education, rigorous curriculum, distinguished staff, and academic achievements can attract students seeking a challenging learning environment.`
    },
    {
      icon:images.community,
      title: 'Supportive Community',
      reason:'Showcasing a welcoming and inclusive atmosphere, supportive staff and fraternity, peer mentorship, and a strong sense of community can attract pupils searching for a supportive environment where they feel valued and encouraged to thrive.'
    },
    {
      icon:images.career,
      title:'Career Preparation',
      reason: 'Highlighting career-focused programs, extra curricular activities, vocational training, and alumni success stories can appeal to pupils aiming for practical skills development, networking, and career preparedness opportunities.'
    },
  ]
  return (
    <div className="my-14 w-[90%] mx-auto h-[50%]">
      <h2 className="head-text">Why <span>Choose</span> Us ?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-center mt-9">
        {
          Reasons.map((reasons) =>(
            <div key={reasons.title} className=" transition duration-75 shadow-xl rounded-lg p-3 hover:scale-105">
              <div
              className="bg-[#313bac] w-14 rounded-t-lg" 
              ><img src={reasons.icon} alt='icon' className="w-full object-contain" /></div>
              <div>
              <h3 className="text-lg font-bold mt-1">
                {reasons.title}
              </h3></div>
              <div>
                <p className="p-text text-md">
                  {reasons.reason}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Choice;