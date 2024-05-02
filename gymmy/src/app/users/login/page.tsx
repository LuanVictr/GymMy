"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import checkIsMobile from "@/utils/isMobile";
import useLogin, { IUserLogin } from "@/app/hooks/UseLogin";
import { useRouter } from "next/navigation";
import { notificateError, notificateSucess } from "@/components/notification";

export default function Login() {
  const [form] = Form.useForm();
  const history = useRouter();
  const { mutate: loginData, isPending: isLoading, data } = useLogin();

  const isMobile = checkIsMobile();

  const onFinish = (values: IUserLogin) => {
    loginData(values, {
      onSuccess: (data) => { 
        localStorage.setItem( 'token', data)
        notificateSucess('Login realizado com sucesso')
        history.push("/question")
      },
      onError: () => {
        notificateError();
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          minWidth: isMobile ? "80%" : "35%",
          maxWidth: isMobile ? "80%" : "40%",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <img src="/gymmy-logo.png" alt="Logo" style={{ width: "60%" }} />
        <h1>Faça login</h1>
        <Form
          style={{ width: "100%" }}
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 6, message: "Username must be at least 6 characters!" },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
          <Button
              style={{ width: "100%" }}
              onClick={() => {history.push('/users/register')}}
            >
              Criar conta
            </Button>
        </Form>
      </div>
    </div>
  );
}