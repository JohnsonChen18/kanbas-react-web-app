import "./index.css"

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 gx-4">

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/reactjs.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/1234/Home"
                                   style={{
                                       textDecoration: "none",
                                       color: "navy",
                                       fontWeight: "bold",
                                       whiteSpace: "nowrap",
                                       overflow: "hidden",
                                       textOverflow: "ellipsis",
                                       display: "block"
                                   }}>
                                    CS1234 React JS
                                </a>
                                <p className="wd-dashboard-course-title card-text"
                                   style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                    Full Stack software developer
                                </p>
                                <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs5700cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/5700/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5700 Computer Network
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Computer Network Theory
                                </p>
                                <a href="#/Kanbas/Courses/5700/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs5800cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/5800/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5800 Algorithm
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to algorithm
                                </p>
                                <a href="#/Kanbas/Courses/5800/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs6220cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/6220/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS6220 Cloud Computing
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to Cloud
                                </p>
                                <a href="#/Kanbas/Courses/6220/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs6120cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/6120/Home"
                                   style={{
                                       textDecoration: "none", color: "navy", fontWeight: "bold",
                                   }}>
                                    CS6220 Artificial Intelligence
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to Artificial Intelligence
                                </p>
                                <a href="#/Kanbas/Courses/6120/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs5200cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/5200/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5200 Database
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to database
                                </p>
                                <a href="#/Kanbas/Courses/5200/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs6200cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/6200/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS6200 Computer Vision
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to CV
                                </p>
                                <a href="#/Kanbas/Courses/6200/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/cs5600cover.jpg"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link"
                                   href="#/Kanbas/Courses/5600/Home"
                                   style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5600 Computer System
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Computer System Theory
                                </p>
                                <a href="#/Kanbas/Courses/5600/Home" className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
