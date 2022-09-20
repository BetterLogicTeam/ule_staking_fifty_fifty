import "./Index_home.css";
export const Home = () => {
  return (
    <>
      <body>
        <header className="wyzHeader fixed pb-5" id="main-head">
          <div className="container">

            <div id="myNav10" className="overlay10 textcenter">
              <a className="closebtn" onclick="closeNav10()">&times;</a>
              <div className="overlay10-content">
                <p>
                  Buy and sell NFTs directly from your Metamask wallet, in Bnb & Poly, and
                  save up to 70% on gas fees!
                </p>
              </div>
            </div>

            <nav className="navbar navbar-expand-sm  navbar-dark">
              <div className="container-fluid">
                <div className="Toggle_class">
                  <a className="" href="/"><img src="assets/images/logo.png" className="nav_image" /></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggle"><i className="fa fa-bars"></i></span>
                  </button>
                </div>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                  <ul className="navbar-nav ms-0">

                    <li className="nav-item teli_icon">
                      <a className="nav-link btn_effct  btn_size " href="/login">Log In</a>
                    </li>
                    <li className="nav-item teli_icon">
                      <a className="nav-link btn_effct btn_size" href="/login">Sign Up</a>
                    </li>
                    <li className="nav-item teli_icon">
                      <a className="nav-link py_0 btn_effct text-center newClass" href="/login">
                        <img className="meta-ma" src="assets/images/Icon/metamask.png" />

                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <section className="wyz_top">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="yeep_py py_mob mt-5">
                  <div className="wyz_banner">
                    <h1>The Premier Marketplace for farming NFTs</h1>
                  </div>
                  <div className="wyz_content">
                    <p>Yeep ULEnft network is the premier marketplace for ULEnfts, which are digital
                      items you can truly own. Digital Items have existed for a long time, but
                      never like this can be farm.
                    </p>
                  </div>
                  <div className="get_btn">
                    <a href="javascript:void(0);" className="btn_outline btn btn_all">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="yeepule_img mb_6">
                  <img
                    className="des-ho"
                    src="assets/images/Icon/ULE 4.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="wyz_top">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="yeep_img">
                  <img
                    className="yee-img"
                    src="assets/images/Icon/ULE_70.png"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="yeep_py mt-5">
                  <div className="wyz_banner">
                    <h1>Farm your NFTs on Yeep ULEnft network</h1>
                  </div>
                  <div className="wyz_content">
                    <p>Are you an owner  or NFT holder? Get in touch
                      with us to get your farming incomes against your ownership & holdership on Yeep ULEnft network with any time harvesting option.!</p>
                  </div>
                  <div className="get_btn">
                    <a href="javascript:void(0);" className="btn_outline btn btn_all">
                      I am an owner
                    </a>
                    <a href="javascript:void(0);" className="btn_outline btn mt_5 btn_all ">
                      I am a holder
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="wyz_top">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="yeep_compare">
                  <div className="yeep_differ">
                    <div className="yeep_logo">
                      <img src="assets/images/logo.png" alt="Yeep" id="logo" style={{ height: "80px" }} />
                    </div>
                    <div className="Add_Icon">
                      <img
                        className="yeep-logo2"
                        src="assets/images/Icon/Plus_icon.svg"
                      />
                    </div>
                    <div className="yeep_logo">
                      <img
                        className="yeep-logo3"
                        src="assets/images/Icon/bridge_icon.png"
                      />
                    </div>
                  </div>
                  <div className="yeep_pt">
                    <div className="wyz_banner">
                      <h1>Yeep ULEnfts incomes can be bridge-in-out from WYZthswap bridge</h1>
                    </div>
                    <div className="wyz_content yeep_maxwth">
                      <p>This means you can use muti-chain ULE-tokens to utilise your NFTs with other Yeep ULE networks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <footer className="footer_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="footer_content pb-5">
                  <p>We will not rest until 1 Billion People are collecting ULEnfts.</p>
                </div>
              </div>
              <div className="footer_bottom">
                <div className="row">
                  <div className="col-md-6">
                    <div className="footer_social">
                      <a className="btn" href="https://m.facebook.com/ULE-Community-113662044683677" target="_blank">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a className="btn" href="https://instagram.com/ule.community?igshid=YmMyMTA2M2Y=" target="_blank">
                        <i className="fa fa-instagram"></i>
                      </a>
                      <a className="btn" href="https://t.me/ulecommunity" target="_blank">
                        <i className="fa fa-paper-plane"></i>
                      </a>
                      <a className="btn" href="https://mobile.twitter.com/UleCommunity" target="_blank">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="footer_copyright">
                      <p>© All Right Reserved. YeepULEnft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
      {/* <body className="page-template-default page page-id-46 custom-background et_pb_button_helper_class et_fixed_nav et_show_nav et_primary_nav_dropdown_animation_fade et_secondary_nav_dropdown_animation_fade et_header_style_left et_pb_footer_columns4 et_cover_background et_pb_gutter windows et_pb_gutters3 et_pb_pagebuilder_layout et_no_sidebar et_divi_theme et-db et_minified_js et_minified_css">
        <div id="page-container">
          <header id="main-header" className="hed-nav" data-height-onload="66">
            <div className="container clearfix et_menu_container">
              <div className="logo_container">
                <div id="myNav10" className="overlay10 textcenter">
                  <a className="closebtn" onclick="closeNav10()">
                    ×
                  </a>
                  <div className="overlay10-content">
                    <p>
                      Buy and sell NFTs directly from your Metamask wallet, in
                      Bnb &amp; Poly, and save up to 70% on gas fees!
                    </p>
                  </div>
                </div>
                
                <span className="logo_helper"></span>
                <a href="/login">
                  <img src="assets/images/logo.png" alt="Yeep" id="logo" />
                </a>
              </div>
              
              <div
                id="et-top-navigation"
                data-height="66"
                data-fixed-height="40"
              >
                <nav id="top-menu-nav">
                  <ul id="top-menu" className="nav">
                    <li
                      id="menu-item-45"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn "
                    >
                      <a className="pu-in" href="/login">
                        Log In
                      </a>
                    </li>
                    <li
                      id="menu-item-45"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn "
                    >
                      <a className="pu-in" href="/login">
                        Sign Up
                      </a>
                    </li>
                    <li
                      id="menu-item-45"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn "
                    >
                      <a className="pu-in" href="/login">
                        <img className="meta-ma" src="assets/images/Icon/metamask.png" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <div id="et-main-area">
            <div id="main-content">
              <article
                id="post-46"
                className="post-46 page type-page status-publish hentry"
              >
                <div className="entry-content">
                  <div id="et-boc" className="et-boc">
                    <div className="et-l et-l--post">
                      <div className="et_builder_inner_content et_pb_gutters3">
                        <div className="et_pb_section et_pb_section_0 et_animated et_pb_fullwidth_section et_section_regular">
                          <section className="et_pb_module et_pb_fullwidth_header et_pb_fullwidth_header_0 et_animated et_hover_enabled et_pb_header_with_image et_pb_text_align_left et_pb_bg_layout_light">
                            <div className="et_pb_fullwidth_header_container left">
                              <div className="header-content-container center">
                                <div className="header-content">
                                  <h5 className="et_pb_module_header">
                                    The Premier Marketplace for farming NFTs
                                  </h5>
                                  <div className="et_pb_header_content_wrapper">
                                    <p className="olli-vi">
                                      {" "}
                                      <span style={{ fontSize: "16px" }}>
                                        Yeep ULEnft network is the premier
                                        marketplace for ULEnfts, which are
                                        digital items you can truly own. Digital
                                        Items have existed for a long time, but
                                        never like this can be farm.
                                      </span>
                                    </p>
                                    <p>&nbsp;</p>
                                  </div>
                                  <li
                                    id="menu-item-45"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn1 "
                                  >
                                    <a className="pu-in" href="/login">
                                      Learn More
                                    </a>
                                  </li>
                                </div>
                              </div>
                              <div className="header-image-container center">
                                <div className="header-image">
                                  <img
                                    className="des-ho"
                                    src="assets/images/Icon/ULE 4.webp"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="et_pb_fullwidth_header_overlay"></div>
                            <div className="et_pb_fullwidth_header_scroll"></div>
                          </section>
                        </div>

                        <section className="wyz_top">
                         
                            <div className="row tp-yt">
                              <div className="col-md-4">
                                <div className="yeep_img">
                                  <img
                                    className="yee-img"
                                    src="assets/images/Icon/ULE_70.png"
                                  />
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="yeep_py">
                                  <div className="wyz_banner">
                                    <h1 className="yee-h1">
                                      Farm your NFTs on Yeep ULEnft network
                                    </h1>
                                  </div>
                                  <div className="wyz_content">
                                    <p className="yee-p">
                                      Are you an owner or NFT holder? Get in
                                      touch with us to get your farming incomes
                                      against your ownership & holdership on
                                      Yeep ULEnft network with any time
                                      harvesting option.!
                                    </p>
                                  </div>
                                  <div className="get_btn" >
                                  <li
                                    id="menu-item-45"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn1 "
                                  >
                                    <a className="pu-in" href="/login">
                                     I am an owner
                                    </a>
                                  </li>
                                  <li
                                    id="menu-item-45"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45 join_btn1 "
                                  >
                                    <a className="pu-in" href="/login">
                                      I am a holder
                                    </a>
                                  </li>
                                  </div>
                                </div>
                              </div>
                            </div>
                       
                        </section>

                        <section className="wyz_top">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-10 offset-md-2">
                                <div className="yeep_compare">
                                  <div className="yeep_differ">
                                    <div className="yeep_logo">
                                      <img
                                        className="yeep-logo1"
                                        src="assets/images/logo.png"
                                      />
                                    </div>
                                    <div className="Add_Icon">
                                      <img
                                        className="yeep-logo2"
                                        src="assets/images/Icon/Plus_icon.svg"
                                      />
                                    </div>
                                    <div className="yeep_logo">
                                      <img
                                        className="yeep-logo3"
                                        src="assets/images/Icon/bridge_icon.png"
                                      />
                                    </div>
                                  </div>
                                  <div className="yeep_pt">
                                    <div className="wyz_banner">
                                      <h1 className="yeep-h1-1">
                                        Yeep ULEnfts incomes can be
                                        bridge-in-out from WYZthswap bridge
                                      </h1>
                                    </div>
                                    <div className="wyz_content yeep_maxwth">
                                      <p className="yeep-p">
                                        This means you can use muti-chain
                                        ULE-tokens to utilise your NFTs with
                                        other Yeep ULE networks.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <hr />
         
          <footer className="footer_section">
	
			<div className="row ft-r">
				<div className="col-md-12">
					<div className="footer_content">
						<p className="yeep-para">We will not rest until 1 Billion People are collecting ULEnfts.</p>
					</div>
				</div>
        <hr />
				<div className="footer_bottom">
					<div className="row">
						<div className="col-md-6">
							<div className="footer_social">
								<a className="btn" href="https://m.facebook.com/ULE-Community-113662044683677" target="_blank">
									<i className="fa fa-facebook"></i>
								</a>
								<a className="btn" href="https://instagram.com/ule.community?igshid=YmMyMTA2M2Y=" target="_blank">
									<i className="fa fa-instagram"></i>
								</a>
								<a className="btn" href="https://t.me/ulecommunity" target="_blank">
									<i className="fa fa-paper-plane"></i>
								</a>
								<a className="btn" href="https://mobile.twitter.com/UleCommunity" target="_blank">
									<i className="fa fa-twitter"></i>
								</a>
							</div>
						</div>
						<div className="col-md-6">
							<div className="footer_copyright">
								<p className="footer-p">© All Right Reserved. YeepULEnft</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		
	</footer>
  <button onclick="topFunction()" id="myBtn" title="Go to top"><img src="assets/images/Icon/cheveron.png" /></button>

        </div>
      </body>
      <link rel="stylesheet" type="text/css" href="assets/css/style22ca.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/home.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/responsive.css" />
      <link href="~/latestassets/front/css/responsive.css" rel="stylesheet" /> */}
    </>
  );
};
