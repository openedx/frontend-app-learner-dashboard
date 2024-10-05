import i18n from 'i18next';
import i18nBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n

  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          language: 'Language',
          learnAndGrow: 'Learn and Grow',
          learnAndGrowDetail: 'Our edX learning experience is grounded in cutting-edge cognitivescience. With more than two dozen distinct learning features to help you achieve your goals, our approach follows three key principles;',
          experience: 'Experience',
          experienceDetail: 'Learn new knowledge and skills in a variety of ways, from engaging video lectures and dynamic graphics to data visualizations and interactive elements.',
          practice: 'Practice',
          practiceDetail: 'Demonstrating your knowledge is a critical part of learning. edX courses and programs provide a space to practice with quizzes, open response assessments, virtual environments, and more.',
          apply: 'Apply',
          applyDetail: 'Learning on edX transforms how you think and what you can do, and translates directly into the real world—immediately apply your new capabilities in the context of your job.',
          welcome: 'Welcome to CBC Academy',
          onlineCourses: 'Online Courses',
          buildSkills: 'Build up your skills. Explore courses here',
          searchPlaceholder: 'What do you want to learn?',
          searchButton: 'SEARCH',
          course: 'Course',
          discoverNew: 'Discover New',
          aboutUs: 'About Us',
          browseCourses: 'Browse Courses',
          myCourse: 'My Course',
        },
      },
      kh: {
        translation: {
          language: 'ភាសា',
          learnAndGrow: 'សិក្សា និងពង្រឹង',
          learnAndGrowDetail: 'បទពិសោធន៍ការសិក្សារបស់យើងនៅលើ edX គឺផ្អែកលើវិទ្យាសាស្ត្របច្ចេកវិទ្យាថ្មីៗ។ ជាមួយនឹងលក្ខណៈការសិក្សាដែលខុសគ្នាជាងពីរមុខដងដើម្បីជួយអ្នកឲ្យសម្រេចបានគោលបំណងរបស់អ្នក វិធីសាស្ត្រ​របស់យើងតាមដានគ្រឹះសំខាន់បីយ៉ាង',
          experience: 'បទពិសោធន៍',
          experienceDetail: 'សិក្សាសំណាញ់ថ្មីៗ និងជំនាញផ្សេងៗជាច្រើនវិធី ដោយប្រើការបង្ហាញវីដេអូដែលមានការចូលរួម និងក្រាហ្វិកផ្លាស់ប្តូរទៅដល់ការបង្ហាញទិន្នន័យ និងអង្គធាតុអន្តរកម្ម។',
          practice: 'ការអនុវត្ត',
          practiceDetail: 'ការបង្ហាញចំណេះដឹងរបស់អ្នកគឺជាផ្នែកសំខាន់មួយនៃការសិក្សា។ មេរៀន និងកម្មវិធី edX ផ្តល់ឱ្យនូវកន្លែងសម្រាប់អនុវត្តជាមួយនឹងសំណួរ, ការប៉ាន់ប្រមាណឆ្លើយតបបើក, បរិយាកាសវឺជួរប្រព័ន្ធ, និងច្រើនទៀត។',
          apply: 'អនុវត្ត',
          applyDetail: 'ការសិក្សានៅលើ edX បម្លែងរបៀបដែលអ្នកគិត និងអ្វីដែលអ្នកអាចធ្វើបាន ហើយបំប្រែទៅជាការអនុវត្តនៅក្នុងពិភពពិត—អាចអនុវត្តជាក់លាក់សមត្ថភាពថ្មីរបស់អ្នកក្នុងបរិបទនៃការងាររបស់អ្នក។',
          welcome: 'សូមស្វាគមន៍មកកាន់សាលារៀន CBC',
          onlineCourses: 'វគ្គសិក្សាអនឡាញ',
          buildSkills: 'បង្កើនជំនាញរបស់អ្នក ស្វែងរកវគ្គសិក្សាដែលនេះ',
          searchPlaceholder: 'អ្នកចង់រៀនអ្វី?',
          searchButton: 'ស្វែងរក',
          course: 'វគ្គសិក្សា',
          discoverNew: 'ស្វែងរកវគ្គសិក្សាថ្មី',
          aboutUs: 'អំពី​យើង',
          browseCourses: 'ស្វែងរកមេរៀន',
          myCourse: 'វគ្គសិក្សាខ្ញុំ',
        },
      },
    },
  });

export default i18n;