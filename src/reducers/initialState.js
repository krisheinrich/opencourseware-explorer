export default {
  categories: {
    isFetching: false,
    byId: {
      "2175": {
        children: [
          "Art & Society", "Art History", "Design", "Pop Culture", "Media Studies",
          "Film & Video", "Photography", "Music", "Dance", "Architecture", "Urban Planning",
        ]
      },
      "2202": {
        children: [
          "Economics", "Finance", "Data Modeling", "Marketing", "Management", "Information Systems",
          "Game Theory", "Business Law"
        ]
      },
      "2267": {
        children: [
          "Academia", "Research", "Teaching", "Learning Disabilities", "Online Education", "Physical Education"
        ]
      },
      "2327": {
        children: [
          "History", "Culture & Civilization", "Philosophy", "Intellectual History", "Classics",
           "Comparative Literature", "Religious Studies", "Gender Studies", "Human Rights"
        ]
      },
      "2513": {
        children: [
          "Algebra", "Number Theory", "Statistics & Probability", "Calculus", "Differential Equations",
          "Linear Algebra", "Combinatorics", "Graph Theory", "Algorithms", "Applied Math", "Machine Learning"
        ]
      },
      "2605": {
        children: [
          "Chemistry", "Physics", "Biology", "Biotechnology", "Physiology", "Health", "Nutrition",
          "Environment", "Engineering", "Material Science", "Computer Science", "IT"
        ]
      },
      "2787": {
        children: [
          "Anthropology", "Sociology", "Psychology", "Political Science", "International Relations", "Law & Policy",
          "Globalization", "Race & Ethnic Identity", "Gender & Sexuality", "Justice"
        ]
      },
      "372822": {
        children: [
          "Teaching", "Online Education"
        ]
      },
      "516814": {
        children: [
          "Logistics", "Biomedical Engineering"
        ]
      }
    }
  },
  courses: {
    isFetching: false,
    byHash: {}
  },
  pagination: {
    byCategory: {  // 25 results/page
      isFetching: false,
      count: 0,
      currentPage: 0,
      totalPages: 0,
      courses: []
    },
    bySearch: {  // 10 results/page
      isFetching: false,
      count: 0,
      currentPage: 0,
      totalPages: 0,
      courses: []
    }
  },
  user: {
    name: '',
    email: '',
    isAuthenticated: false,
    savedCourses: []
  }
};
