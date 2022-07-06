package tds.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import tds.service.MemberService;

@Configuration

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests().antMatchers("/").permitAll()
                .and()
                .formLogin()
                .loginPage("/member/login")
                .loginPage("/member/signupsuccess")
                .loginProcessingUrl("/member/loginController")
                 //UsernamePassword Authentication Token 발생
                .defaultSuccessUrl("/")
                .usernameParameter("memberId")
                .passwordParameter("password")
                .failureUrl("/page/member/login")
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .and()
                .csrf()
                 //회사 가입 시
                .ignoringAntMatchers("/page/company/signup")
                .ignoringAntMatchers("/company/signupController")
                .ignoringAntMatchers("/company/check")
                .ignoringAntMatchers("/company/numberCheck")
                .ignoringAntMatchers("/company/signup")
                 //회사 가입 성공 시
                .ignoringAntMatchers("/company/info")

                 //회원 가입 시
                .ignoringAntMatchers("/page/member/signup")
                .ignoringAntMatchers("/company/findNumber")
                .ignoringAntMatchers("/member/signupController")
                .ignoringAntMatchers("/member/signup")

                //회원 가입 성공 시
                .ignoringAntMatchers("/page/member/signupsuccess")

                // 로그인 시
                .ignoringAntMatchers("/page/member/login")
                .ignoringAntMatchers("/member/loginController")
                .ignoringAntMatchers("/member/loginSession");

    }
    @Autowired
    private MemberService  memberService;

    @Override
    public void configure(AuthenticationManagerBuilder AMB) throws Exception {
           AMB.userDetailsService(memberService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
