import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={200} height={150} alt="React JS"/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      
        <div className="wd-dashboard-course">
          <Link href="/Courses/5610" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpeg" width={200} height={150} alt="Web Development"/>
            <div>
              <h5> CS5610 Web Development </h5>
              <p className="wd-dashboard-course-title">
                SEC 04 Fall 2025 [BOS-1-TR]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5800" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpeg" width={200} height={150} alt="Algorithms"/>
            <div>
              <h5> CS5800 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                SEC 02 Spring 2024 [VTL-2-OL]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/6954" className="wd-dashboard-course-link">
            <Image src="/images/coop.png" width={200} height={150} alt="Co-op Work Experience"/>
            <div>
              <h5> CS6954 Co-op Work Experience </h5>
              <p className="wd-dashboard-course-title">
                SEC 05 Fall 2024 [XCR-2-CO]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5110" className="wd-dashboard-course-link">
            <Image src="/images/datamang.jpeg" width={200} height={150} alt="Data Management"/>
            <div>
              <h5> DS5110 Intro to Data Management </h5>
              <p className="wd-dashboard-course-title">
                SEC 04 Fall 2023 [BOS-2-TR]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5220" className="wd-dashboard-course-link">
            <Image src="/images/supermach.jpeg" width={200} height={150} alt="Machine Learning"/>
            <div>
              <h5> DS5220 Supervised Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                SEC 01 Fall 2023 [BOS-2-TR]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5230" className="wd-dashboard-course-link">
            <Image src="/images/unsupermach.png" width={200} height={150} alt="Machine Learning"/>
            <div>
              <h5> DS5230 Unsupervised Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                SEC 06 Spring 2024 [BOS-2-TR]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5500" className="wd-dashboard-course-link">
            <Image src="/images/datasci.png" width={200} height={150} alt="Data Science Capstone"/>
            <div>
              <h5> DS5500 Data Science Capstone </h5>
              <p className="wd-dashboard-course-title">
                SEC 03 Fall 2025 [BOS-1-TR]
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}