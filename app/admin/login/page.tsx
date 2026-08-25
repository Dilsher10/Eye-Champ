"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import "./login.css";

export default function AdminLoginPage(){
  const [showPassword,setShowPassword]=useState(false),[loading,setLoading]=useState(false),[success,setSuccess]=useState(false),[error,setError]=useState("");

  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form=new FormData(event.currentTarget);
    const email=String(form.get("email")||"");
    const password=String(form.get("password")||"");
    if(!email.includes("@")||password.length<6){setError("Enter a valid email and a password with at least 6 characters.");return}
    setError("");setLoading(true);
    window.setTimeout(()=>{setLoading(false);setSuccess(true)},700);
  }

  return <main className="admin-login">
    <section className="login-visual">
      <Link href="/" className="login-logo"><Image src="/images/logo.png" alt="Eye Champ" width={175} height={58} priority/></Link>
      <div className="login-art"><span className="ring one"/><span className="ring two"/><div className="glasses-mark">⌁</div></div>
      <div className="login-message"><small>Eye Champ Administration</small><h1>Clarity for every<br/>part of your business.</h1><p>Manage products, orders, inventory, and customers from one focused workspace.</p><div><span><ShieldCheck size={17}/></span><p><strong>Secure administration</strong><small>Your workspace is protected with enterprise-grade security.</small></p></div></div>
      <footer>© 2026 Eye Champ. All rights reserved.</footer>
    </section>
    <section className="login-panel">
      <div className="login-mobile-logo"><Link href="/"><Image src="/images/logo.png" alt="Eye Champ" width={145} height={48}/></Link></div>
      <div className="login-box">
        {success?<div className="login-success"><span><CheckCircle2 size={30}/></span><h1>Welcome back</h1><p>You’ve signed in successfully. Continue to your Eye Champ dashboard.</p><Link href="/admin">Open dashboard <ArrowRight size={16}/></Link><button onClick={()=>setSuccess(false)}>Use another account</button></div>:<>
          <div className="login-heading"><span>Admin portal</span><h1>Welcome back</h1><p>Sign in to manage your Eye Champ store.</p></div>
          <form onSubmit={submit} noValidate>
            <label><span>Email address</span><div><Mail size={17}/><input name="email" type="email" autoComplete="email" placeholder="admin@eyechamp.com" required/></div></label>
            <label><span><b>Password</b><a href="#">Forgot password?</a></span><div><LockKeyhole size={17}/><input name="password" type={showPassword?"text":"password"} autoComplete="current-password" placeholder="Enter your password" required/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
            <label className="remember"><input type="checkbox" defaultChecked/><span>Keep me signed in on this device</span></label>
            {error&&<p className="login-error" role="alert">{error}</p>}
            <button className="login-submit" disabled={loading}>{loading?<><i/> Signing in...</>:<>Sign in <ArrowRight size={16}/></>}</button>
          </form>
          <div className="login-divider"><span>or continue with</span></div>
          <button className="google-button"><span>G</span> Sign in with Google Workspace</button>
          <p className="login-help">Having trouble signing in? <a href="#">Contact support</a></p>
        </>}
      </div>
      <footer><a href="#">Privacy policy</a><span>•</span><a href="#">Terms of use</a><span>•</span><a href="#">Help center</a></footer>
    </section>
  </main>
}
