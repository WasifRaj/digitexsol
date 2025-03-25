<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digitexsol</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg custom-header">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="/">
                    <img src="assets/images/logo.png" alt="Logo">
                </a>

                <!-- Navbar Toggler for Mobile -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navbar Links -->
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Our Work</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
                    </ul>
                </div>

                <!-- Right Side Buttons -->
                <div class="d-flex align-items-center">
                    <a href="tel: 123 456 7890" class="btn"><i class="fa-solid fa-phone"></i> 123 456 7890</a>
                </div>
            </div>
        </nav>
    </header>

    <main id="main">
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center">
                <div class="col-md-6 col-lft">
                    <div class="content">
                    <h5>Digitexsol</h5>
                    <h1><span class="different">Digital</span> Agency</h1>
                    <h4>Innovative Digital Agency<br>
                        Crafting Impacful Designs, Branding, And
                    </h4>
                    <div class="buttons">
                        <a href="#" class="btn btn-secondary">
                            Explore More 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </a>
                        <a href="#" class="btn btn-secondary">
                            Request A Quote 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </a>
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <figure>
                        <img class="astronut float-end" src="assets/images/astronut.png" alt="astronut">
                    </figure>
                </div>
                </div>
                <div class="marquee-container">
                    <div class="row marquee-text-section">
                        <div class="marquee-wrapper">
                            <div class="marquee-text" id="marqueeText1">
                                <span>DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY</span>
                            </div>
                            <div class="marquee-text" id="marqueeText2">
                                <span>DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY DIGITAL AGENCY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="custom.js"></script>
</body>
</html>