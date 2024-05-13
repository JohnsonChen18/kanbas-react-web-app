export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/1234/Home">
                            CS1234 React JS
                        </a>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer
                        </p>
                        <a href="#/Kanbas/Courses/1234/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs5700cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/5700/Home">
                            CS5700 Computer Network
                        </a>
                        <p className="wd-dashboard-course-title">
                            Computer Network Theory
                        </p>
                        <a href="#/Kanbas/Courses/5700/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs5800cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/5800/Home">
                            CS5800 Algorithm
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to algorithm
                        </p>
                        <a href="#/Kanbas/Courses/5800/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs6220cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/6220/Home">
                            CS6220 Cloud Computing
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to Cloud
                        </p>
                        <a href="#/Kanbas/Courses/6220/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs6120cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/6120/Home">
                            CS6220 Natural Language Processing
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to NLP
                        </p>
                        <a href="#/Kanbas/Courses/6120/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs5200cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/5200/Home">
                            CS5200 Database
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to database
                        </p>
                        <a href="#/Kanbas/Courses/5200/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs6200cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/6200/Home">
                            CS6200 Computer Vision
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to CV
                        </p>
                        <a href="#/Kanbas/Courses/6200/Home"> Go </a>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/cs5600cover.jpg" width={200}/>
                    <div>
                        <a className="wd-dashboard-course-link"
                           href="#/Kanbas/Courses/5600/Home">
                            CS5600 Computer System
                        </a>
                        <p className="wd-dashboard-course-title">
                            Introduction to Computer System
                        </p>
                        <a href="#/Kanbas/Courses/5600/Home"> Go </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
