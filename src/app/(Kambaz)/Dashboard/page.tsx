import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">

        {/* COURSE 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS"/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="Node JS"/>
            <div>
              <h5> CS5678 Node JS </h5>
              <p className="wd-dashboard-course-title">
                Backend Developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/9101" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="Python"/>
            <div>
              <h5> CS9101 Python </h5>
              <p className="wd-dashboard-course-title">
                Data Science Foundations
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="Java"/>
            <div>
              <h5> CS1121 Java </h5>
              <p className="wd-dashboard-course-title">
                Object-Oriented Programming
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3141" className="wd-dashboard-course-link">
            <Image src="/images/angular.jpg" width={200} height={150} alt="Angular"/>
            <div>
              <h5> CS3141 Angular </h5>
              <p className="wd-dashboard-course-title">
                Frontend Frameworks
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5161" className="wd-dashboard-course-link">
            <Image src="/images/mongodb.jpg" width={200} height={150} alt="MongoDB"/>
            <div>
              <h5> CS5161 MongoDB </h5>
              <p className="wd-dashboard-course-title">
                NoSQL Databases
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* COURSE 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/7181" className="wd-dashboard-course-link">
            <Image src="/images/aws.jpg" width={200} height={150} alt="AWS"/>
            <div>
              <h5> CS7181 AWS </h5>
              <p className="wd-dashboard-course-title">
                Cloud Computing
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
);}