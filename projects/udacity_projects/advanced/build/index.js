/* import _ from 'lodash';


const port = 3000;
interface Person {
  name: string;
  age?: number;
}
interface Student extends Person {
  readonly courses: string[];
}

console.log(port);

function printCourses (student: Student) {
  // student.courses = ['!2']; not allowed because it is readonly property
  console.log(student?.courses);
}

printCourses({
  name: '12',
  courses: ['cs']
});



console.log(_.multiply(1,2)); */
// learning Jasmine
var myFunc = function (num) {
    return num * num;
};
export default myFunc;
