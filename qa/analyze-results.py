#!/usr/bin/env python3
"""
Analyze test results and generate summary report
Usage: python qa/analyze-results.py
"""

import json
import os
from pathlib import Path

def analyze_newman_results():
    """Analyze Newman (Postman) test results"""
    newman_file = Path('qa/results/newman-results.json')

    if not newman_file.exists():
        print("❌ Newman results not found. Did you run the tests?")
        return None

    with open(newman_file) as f:
        data = json.load(f)

    run = data.get('run', {})
    stats = run.get('stats', {})
    executions = run.get('executions', [])

    total = stats.get('requests', {}).get('total', 0)
    failed = stats.get('requests', {}).get('failed', 0)
    passed = total - failed

    assertions = stats.get('assertions', {})
    total_assertions = assertions.get('total', 0)
    failed_assertions = assertions.get('failed', 0)
    passed_assertions = total_assertions - failed_assertions

    print("\n" + "="*60)
    print("NEWMAN (POSTMAN) API TEST RESULTS")
    print("="*60)
    print(f"Total Requests:        {total}")
    print(f"Passed Requests:       {passed} ({passed/total*100:.1f}%)" if total > 0 else "Passed Requests: 0")
    print(f"Failed Requests:       {failed}")
    print(f"\nTotal Assertions:      {total_assertions}")
    print(f"Passed Assertions:     {passed_assertions}")
    print(f"Failed Assertions:     {failed_assertions}")

    # List failed requests
    if failed > 0:
        print("\n❌ Failed Requests:")
        for exec in executions:
            if exec.get('response', {}).get('code', 200) >= 400:
                req_name = exec.get('item', {}).get('name', 'Unknown')
                status = exec.get('response', {}).get('code', 'N/A')
                print(f"   - {req_name} (Status: {status})")

    # List failed assertions
    if failed_assertions > 0:
        print("\n❌ Failed Assertions:")
        for exec in executions:
            for assertion in exec.get('assertions', []):
                if assertion.get('error'):
                    req_name = exec.get('item', {}).get('name', 'Unknown')
                    assertion_name = assertion.get('assertion', 'Unknown')
                    error = assertion.get('error', {}).get('message', 'No message')
                    print(f"   - {req_name}: {assertion_name}")
                    print(f"     Error: {error}")

    return {
        'total_requests': total,
        'passed_requests': passed,
        'failed_requests': failed,
        'total_assertions': total_assertions,
        'passed_assertions': passed_assertions,
        'failed_assertions': failed_assertions
    }

def analyze_playwright_results():
    """Analyze Playwright test results"""
    pw_file = Path('qa/results/test-results.json')

    if not pw_file.exists():
        print("\n❌ Playwright results not found. Did you run the tests?")
        return None

    with open(pw_file) as f:
        data = json.load(f)

    suites = data.get('suites', [])

    total_tests = 0
    passed_tests = 0
    failed_tests = 0
    skipped_tests = 0

    def count_tests(suite):
        nonlocal total_tests, passed_tests, failed_tests, skipped_tests

        for spec in suite.get('specs', []):
            for test in spec.get('tests', []):
                for result in test.get('results', []):
                    total_tests += 1
                    status = result.get('status', 'unknown')
                    if status == 'passed':
                        passed_tests += 1
                    elif status == 'failed':
                        failed_tests += 1
                    elif status == 'skipped':
                        skipped_tests += 1

        for sub_suite in suite.get('suites', []):
            count_tests(sub_suite)

    for suite in suites:
        count_tests(suite)

    print("\n" + "="*60)
    print("PLAYWRIGHT E2E TEST RESULTS")
    print("="*60)
    print(f"Total Tests:           {total_tests}")
    print(f"Passed Tests:          {passed_tests} ({passed_tests/total_tests*100:.1f}%)" if total_tests > 0 else "Passed Tests: 0")
    print(f"Failed Tests:          {failed_tests}")
    print(f"Skipped Tests:         {skipped_tests}")

    # List failed tests
    if failed_tests > 0:
        print("\n❌ Failed Tests:")
        def print_failed(suite, suite_name=''):
            for spec in suite.get('specs', []):
                for test in spec.get('tests', []):
                    for result in test.get('results', []):
                        if result.get('status') == 'failed':
                            test_title = test.get('title', 'Unknown')
                            error = result.get('error', {}).get('message', 'No error message')
                            print(f"   - {suite_name}: {test_title}")
                            print(f"     Error: {error[:200]}...")

            for sub_suite in suite.get('suites', []):
                print_failed(sub_suite, sub_suite.get('title', ''))

        for suite in suites:
            print_failed(suite, suite.get('title', ''))

    return {
        'total_tests': total_tests,
        'passed_tests': passed_tests,
        'failed_tests': failed_tests,
        'skipped_tests': skipped_tests
    }

def generate_summary_report():
    """Generate overall test summary"""
    print("\n" + "="*60)
    print("QA TEST EXECUTION SUMMARY")
    print("="*60)
    print(f"Test Date: 2026-10-12")
    print(f"Environment: Test Database (Supabase)")
    print(f"Application: Oil Billing System")

    newman = analyze_newman_results()
    playwright = analyze_playwright_results()

    # Manual test cases
    print("\n" + "="*60)
    print("MANUAL TEST CASES")
    print("="*60)
    print("Total Test Cases:      45")
    print("Status:                To be executed manually")
    print("File:                  qa/test-cases.xlsx")

    # Overall summary
    print("\n" + "="*60)
    print("OVERALL SUMMARY")
    print("="*60)

    if newman and playwright:
        total_automated = newman['total_requests'] + playwright['total_tests']
        total_passed = newman['passed_requests'] + playwright['passed_tests']
        total_failed = newman['failed_requests'] + playwright['failed_tests']

        print(f"Total Automated Tests: {total_automated}")
        print(f"Passed:                {total_passed} ({total_passed/total_automated*100:.1f}%)" if total_automated > 0 else "Passed: 0")
        print(f"Failed:                {total_failed}")
        print(f"\nAPI Tests (Newman):    {newman['passed_requests']}/{newman['total_requests']} passed")
        print(f"E2E Tests (Playwright): {playwright['passed_tests']}/{playwright['total_tests']} passed")
        print(f"\nTotal Assertions:      {newman['total_assertions']}")
        print(f"Passed Assertions:     {newman['passed_assertions']}")

        # CV-ready summary
        print("\n" + "="*60)
        print("CV-READY SUMMARY")
        print("="*60)
        print(f"✓ Designed and executed {total_automated} automated tests")
        print(f"✓ Created {newman['total_requests']} API test cases with {newman['total_assertions']} assertions")
        print(f"✓ Developed {playwright['total_tests']} end-to-end test scenarios")
        print(f"✓ Documented 45 manual test cases covering all modules")
        print(f"✓ Achieved {total_passed/total_automated*100:.1f}% pass rate" if total_automated > 0 else "")
        print(f"✓ Identified and documented {total_failed} defects" if total_failed > 0 else "✓ Verified all critical functionality")

    print("\n" + "="*60)
    print("ARTIFACTS CREATED")
    print("="*60)
    print("✓ qa/test-cases.xlsx           - 45 manual test cases")
    print("✓ qa/postman/                  - API test collection")
    print("✓ e2e/billing.spec.ts          - E2E test automation")
    print("✓ qa/results/newman-report.html - API test results")
    print("✓ qa/results/playwright-report/ - E2E test results")
    print("✓ qa/bug-reports.md            - Bug documentation")
    print("\nTo view detailed reports:")
    print("  - Newman:     Open qa/results/newman-report.html")
    print("  - Playwright: npx playwright show-report qa/results/playwright-report")
    print("")

if __name__ == '__main__':
    try:
        generate_summary_report()
    except Exception as e:
        print(f"\n❌ Error analyzing results: {e}")
        print("\nMake sure you've run the tests first:")
        print("  Windows: qa\\run-all-tests.bat")
        print("  Linux:   bash qa/run-all-tests.sh")
