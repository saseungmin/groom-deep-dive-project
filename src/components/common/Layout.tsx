import type { ReactNode } from 'react';

import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6">{children}</main>
      <footer className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">여행모아</h3>
              <p className="text-sm text-muted-foreground">
                즐거운 여행의 시작, 여행모아와 함께하세요.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">여행 정보</h4>
              <ul className="space-y-2 text-sm">
                <li>인기 여행지</li>
                <li>특가 상품</li>
                <li>테마 여행</li>
                <li>그룹 투어</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li>예약 확인</li>
                <li>자주 묻는 질문</li>
                <li>취소 및 환불</li>
                <li>연락처</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">회사 정보</h4>
              <ul className="space-y-2 text-sm">
                <li>회사 소개</li>
                <li>채용 정보</li>
                <li>이용약관</li>
                <li>개인정보처리방침</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 여행모아. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
