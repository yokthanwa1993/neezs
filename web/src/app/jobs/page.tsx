import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Neeiz
              </Link>
              <span className="ml-2 text-sm text-gray-500">Job Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/employer/post-job" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                ลงประกาศงาน
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ค้นหางาน</h1>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ตำแหน่งงาน
              </label>
              <input
                type="text"
                placeholder="เช่น Frontend Developer, Marketing Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานที่
              </label>
              <input
                type="text"
                placeholder="เช่น กรุงเทพ, เชียงใหม่"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทงาน
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">ทั้งหมด</option>
                <option value="fulltime">งานประจำ</option>
                <option value="parttime">งานพาร์ทไทม์</option>
                <option value="contract">งานสัญญาจ้าง</option>
                <option value="internship">งานฝึกงาน</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
                ค้นหา
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Job Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Frontend Developer
                  </h3>
                  <p className="text-gray-600 mb-2">TechCorp Co., Ltd.</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>📍 กรุงเทพมหานคร</span>
                    <span>💰 35,000 - 50,000 บาท</span>
                    <span>⏰ งานประจำ</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    เรากำลังมองหา Frontend Developer ที่มีประสบการณ์ในการพัฒนาเว็บแอปพลิเคชัน 
                    ด้วย React, TypeScript และ Tailwind CSS
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">TypeScript</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Tailwind CSS</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 text-sm font-medium">ใหม่</span>
                  <p className="text-gray-500 text-sm mt-1">2 ชั่วโมงที่แล้ว</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link
                  href="/jobs/1"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ดูรายละเอียด →
                </Link>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  สมัครงาน
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Marketing Manager
                  </h3>
                  <p className="text-gray-600 mb-2">Digital Marketing Agency</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>📍 เชียงใหม่</span>
                    <span>💰 45,000 - 65,000 บาท</span>
                    <span>⏰ งานประจำ</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    รับผิดชอบการวางแผนและดำเนินการด้านการตลาดดิจิทัล 
                    รวมถึงการจัดการทีมและติดตามผลการดำเนินงาน
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Digital Marketing</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">SEO</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Social Media</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-orange-600 text-sm font-medium">ด่วน</span>
                  <p className="text-gray-500 text-sm mt-1">1 วันที่แล้ว</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link
                  href="/jobs/2"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ดูรายละเอียด →
                </Link>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  สมัครงาน
                </button>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    UX/UI Designer
                  </h3>
                  <p className="text-gray-600 mb-2">Creative Studio</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>📍 กรุงเทพมหานคร</span>
                    <span>💰 40,000 - 60,000 บาท</span>
                    <span>⏰ งานประจำ</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    ออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อผู้ใช้สำหรับแอปพลิเคชันและเว็บไซต์ 
                    ทำงานร่วมกับทีมพัฒนาและนักวิเคราะห์ธุรกิจ
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Figma</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Adobe XD</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Prototyping</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-600 text-sm font-medium">ปกติ</span>
                  <p className="text-gray-500 text-sm mt-1">3 วันที่แล้ว</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link
                  href="/jobs/3"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ดูรายละเอียด →
                </Link>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  สมัครงาน
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ตัวกรอง</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประสบการณ์
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">ไม่มีประสบการณ์</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">1-3 ปี</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">3-5 ปี</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">5 ปีขึ้นไป</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เงินเดือน
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">ต่ำกว่า 20,000 บาท</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">20,000 - 35,000 บาท</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">35,000 - 50,000 บาท</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">50,000 บาทขึ้นไป</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติ</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">งานทั้งหมด</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">งานใหม่วันนี้</span>
                  <span className="font-semibold text-green-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">บริษัทที่ร่วมงาน</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 